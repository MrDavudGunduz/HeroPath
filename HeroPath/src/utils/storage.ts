/**
 * LocalStorage Service
 * 
 * A type-safe wrapper around localStorage with error handling,
 * migration support, and data persistence strategies.
 */

export interface StorageError {
  code: 'QUOTA_EXCEEDED' | 'STORAGE_DISABLED' | 'INVALID_DATA' | 'UNKNOWN';
  message: string;
  originalError?: unknown;
}

/**
 * Storage version for migration support
 */
export interface StorageVersion {
  version: number;
  timestamp: number;
}

/**
 * Storage wrapper with type safety and error handling
 */
export const storage = {
  /**
   * Get a value from localStorage
   * @param key Storage key
   * @returns Parsed value or null if not found/invalid
   */
  get: <T>(key: string): T | null => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        console.warn('localStorage is not available');
        return null;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        return null;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      // Remove corrupted data
      storage.remove(key);
      return null;
    }
  },

  /**
   * Set a value in localStorage
   * @param key Storage key
   * @param value Value to store (will be JSON stringified)
   * @throws {StorageError} If storage fails
   */
  set: <T>(key: string, value: T): void => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        throw {
          code: 'STORAGE_DISABLED' as const,
          message: 'localStorage is not available',
        } as StorageError;
      }

      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (err) {
      const storageError = err as unknown as DOMException | Error;

      if (
        (storageError instanceof DOMException && storageError.name === 'QuotaExceededError') ||
        (storageError instanceof DOMException && storageError.code === 22)
      ) {
        const storageErr: StorageError = {
          code: 'QUOTA_EXCEEDED',
          message: 'Storage quota exceeded. Please free up some space.',
          originalError: storageError,
        };
        console.error(`Storage quota exceeded for key "${key}"`, storageErr);
        throw storageErr;
      }

      const storageErr: StorageError = {
        code: 'UNKNOWN',
        message: `Failed to save to localStorage: ${storageError instanceof Error ? storageError.message : 'Unknown error'}`,
        originalError: storageError,
      };
      console.error(`Error writing to localStorage key "${key}":`, storageErr);
      throw storageErr;
    }
  },

  /**
   * Remove a value from localStorage
   * @param key Storage key to remove
   */
  remove: (key: string): void => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  /**
   * Clear all localStorage data
   * Note: This clears ALL localStorage, not just HeroPath data
   */
  clear: (): void => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  /**
   * Clear only HeroPath-related keys
   * @param prefix Key prefix to filter (default: 'heropath.')
   */
  clearAppData: (prefix: string = 'heropath.'): void => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }

      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    } catch (error) {
      console.error(`Error clearing app data with prefix "${prefix}":`, error);
    }
  },

  /**
   * Check if a key exists in localStorage
   * @param key Storage key
   * @returns True if key exists
   */
  has: (key: string): boolean => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      return window.localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  },

  /**
   * Get storage size estimate (approximate)
   * @returns Size in bytes (approximate)
   */
  getSize: (): number => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return 0;
      }

      let total = 0;
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key) {
          const value = window.localStorage.getItem(key) || '';
          total += key.length + value.length;
        }
      }
      return total * 2; // Approximate (UTF-16 encoding)
    } catch {
      return 0;
    }
  },
};

/**
 * Migration system for handling data version updates
 */
export interface Migration {
  version: number;
  migrate: (data: unknown) => unknown;
}

export class StorageMigration {
  private migrations: Migration[] = [];
  private currentVersion: number;

  constructor(currentVersion: number) {
    this.currentVersion = currentVersion;
  }

  /**
   * Register a migration function
   */
  addMigration(version: number, migrate: (data: unknown) => unknown): void {
    this.migrations.push({ version, migrate });
    // Sort by version ascending
    this.migrations.sort((a, b) => a.version - b.version);
  }

  /**
   * Migrate data to current version
   * @param key Storage key
   * @param data Current data
   * @param storedVersion Version stored in localStorage
   * @returns Migrated data
   */
  migrate<T>(key: string, data: T, storedVersion: number): T {
    if (storedVersion >= this.currentVersion) {
      return data; // Already up to date
    }

    let migratedData: unknown = data;

    // Apply migrations in order
    for (const migration of this.migrations) {
      if (migration.version > storedVersion && migration.version <= this.currentVersion) {
        try {
          migratedData = migration.migrate(migratedData);
          console.log(
            `Migrated ${key} from version ${storedVersion} to ${migration.version}`,
          );
        } catch (error) {
          console.error(`Migration failed for ${key} to version ${migration.version}:`, error);
          throw error;
        }
      }
    }

    // Update version in storage
    const versionKey = `${key}.version`;
    storage.set<StorageVersion>(versionKey, {
      version: this.currentVersion,
      timestamp: Date.now(),
    });

    return migratedData as T;
  }

  /**
   * Get stored version for a key
   */
  getStoredVersion(key: string): number {
    const versionKey = `${key}.version`;
    const versionData = storage.get<StorageVersion>(versionKey);
    return versionData?.version ?? 0;
  }

  /**
   * Set version for a key
   */
  setVersion(key: string, version: number): void {
    const versionKey = `${key}.version`;
    storage.set<StorageVersion>(versionKey, {
      version,
      timestamp: Date.now(),
    });
  }
}

/**
 * Create a versioned storage helper
 * @param key Base storage key
 * @param currentVersion Current data version
 * @param migration Migration handler
 */
export function createVersionedStorage<T>(
  key: string,
  currentVersion: number,
  migration?: StorageMigration,
): {
  get: () => T | null;
  set: (value: T) => void;
  getVersion: () => number;
} {
  return {
    get: (): T | null => {
      const data = storage.get<T>(key);
      if (!data) return null;

      if (migration) {
        const storedVersion = migration.getStoredVersion(key);
        if (storedVersion < currentVersion) {
          try {
            const migrated = migration.migrate(key, data, storedVersion);
            // Save migrated data
            storage.set(key, migrated);
            return migrated as T;
          } catch (error) {
            console.error(`Migration failed for ${key}, using fallback:`, error);
            return null;
          }
        }
      }

      return data;
    },
    set: (value: T): void => {
      storage.set(key, value);
      if (migration) {
        migration.setVersion(key, currentVersion);
      }
    },
    getVersion: (): number => {
      if (migration) {
        return migration.getStoredVersion(key);
      }
      return 0;
    },
  };
}
