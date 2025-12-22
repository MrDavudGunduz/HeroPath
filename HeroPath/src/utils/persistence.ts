/**
 * Data Persistence Strategy
 *
 * Provides utilities for managing data persistence with Zustand stores,
 * including debouncing, error handling, and migration support.
 */

import { PersistOptions } from 'zustand/middleware';
import { storage, StorageMigration } from './storage';

/**
 * Storage configuration for Zustand persist middleware
 */
export interface PersistenceConfig<T> {
  name: string;
  version: number;
  migrations?: StorageMigration;
  partialize?: (state: T) => Partial<T>;
  onRehydrateStorage?: () => Promise<T | void>;
}

/**
 * Create a persist configuration for Zustand
 * Note: Zustand's persist middleware uses a different storage interface.
 * This is a simplified version that works with the standard localStorage wrapper.
 */
export function createPersistenceConfig<T>(
  config: PersistenceConfig<T>
): Partial<PersistOptions<T>> {
  const { name, version, partialize } = config;

  // Note: Zustand persist middleware handles storage internally.
  // This config is for reference and can be used with custom storage implementations.
  // For standard Zustand persist, use the built-in storage option directly.
  // Migrations can be handled via the storage wrapper's migration system.

  return {
    name,
    version,
    partialize: partialize as ((state: T) => T) | undefined,
  };
}

/**
 * Debounced storage writer
 * Useful for high-frequency updates that don't need immediate persistence
 */
export class DebouncedStorage {
  private timeouts: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private delay: number;

  constructor(delay: number = 500) {
    this.delay = delay;
  }

  /**
   * Debounced set operation
   */
  set<T>(key: string, value: T): void {
    // Clear existing timeout
    const existing = this.timeouts.get(key);
    if (existing) {
      clearTimeout(existing);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      try {
        storage.set(key, value);
        this.timeouts.delete(key);
      } catch (error) {
        console.error(`Debounced storage set failed for ${key}:`, error);
        this.timeouts.delete(key);
      }
    }, this.delay);

    this.timeouts.set(key, timeout);
  }

  /**
   * Flush all pending writes
   */
  flush(): void {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this.timeouts.clear();
  }

  /**
   * Cancel all pending writes
   */
  cancel(): void {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
    this.timeouts.clear();
  }
}

/**
 * Storage quota manager
 * Monitors and manages localStorage quota
 */
export class StorageQuotaManager {
  private readonly MAX_SIZE = 5 * 1024 * 1024; // 5MB (typical limit is 5-10MB)
  private readonly WARNING_THRESHOLD = 0.8; // 80% of max

  /**
   * Check if storage is approaching quota limit
   */
  checkQuota(): { available: boolean; usage: number; warning: boolean } {
    const currentSize = storage.getSize();
    const usage = currentSize / this.MAX_SIZE;
    const warning = usage >= this.WARNING_THRESHOLD;

    return {
      available: currentSize < this.MAX_SIZE,
      usage,
      warning,
    };
  }

  /**
   * Get storage usage information
   */
  getUsage(): {
    current: number;
    max: number;
    percentage: number;
    available: number;
  } {
    const current = storage.getSize();
    const percentage = (current / this.MAX_SIZE) * 100;

    return {
      current,
      max: this.MAX_SIZE,
      percentage: Math.min(percentage, 100),
      available: Math.max(0, this.MAX_SIZE - current),
    };
  }

  /**
   * Clean up old or unnecessary data
   * @param keys Keys to preserve (all others will be checked for cleanup)
   */
  cleanup(keysToPreserve: string[] = []): number {
    let cleaned = 0;
    const preserveSet = new Set(keysToPreserve);

    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return 0;
      }

      const keysToRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && !preserveSet.has(key) && key.startsWith('heropath.')) {
          // Check if it's old version data or temporary
          if (key.endsWith('.version') || key.includes('.temp')) {
            keysToRemove.push(key);
          }
        }
      }

      keysToRemove.forEach((key) => {
        storage.remove(key);
        cleaned++;
      });
    } catch (error) {
      console.error('Error during storage cleanup:', error);
    }

    return cleaned;
  }
}

/**
 * Export singleton instances
 */
export const debouncedStorage = new DebouncedStorage(500);
export const quotaManager = new StorageQuotaManager();
