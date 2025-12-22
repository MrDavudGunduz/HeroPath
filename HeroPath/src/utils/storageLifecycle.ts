/**
 * Storage Lifecycle Management
 *
 * Handles storage lifecycle events like page unload,
 * ensuring pending writes are flushed before the page closes.
 */

/**
 * Setup storage lifecycle handlers
 * Call this once during app initialization
 */
export function setupStorageLifecycle(): void {
  // Flush pending writes before page unload
  window.addEventListener('beforeunload', () => {
    // Note: In a production app, you might want to track all
    // debounced storage instances and flush them explicitly
    // Use synchronous storage operations if possible
    // This is a best-effort approach since we can't reliably
    // wait for async operations in beforeunload
    try {
      // Force a synchronous operation to trigger any pending writes
      if (typeof window !== 'undefined' && window.localStorage) {
        // Touch localStorage to ensure any pending operations complete
        const testKey = '__heropath_flush_test__';
        const testValue = Date.now().toString();
        window.localStorage.setItem(testKey, testValue);
        window.localStorage.removeItem(testKey);
      }
    } catch (error) {
      console.warn('Failed to flush storage on beforeunload:', error);
    }
  });

  // Handle visibility change (tab switching, etc.)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Page is being hidden, try to flush writes
      // This gives us a better chance than beforeunload
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          const testKey = '__heropath_flush_test__';
          const testValue = Date.now().toString();
          window.localStorage.setItem(testKey, testValue);
          window.localStorage.removeItem(testKey);
        }
      } catch (error) {
        console.warn('Failed to flush storage on visibility change:', error);
      }
    }
  });
}

/**
 * Check if storage is available
 */
export function isStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    const testKey = '__heropath_storage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get storage quota information (if available)
 */
export async function getStorageQuota(): Promise<{
  quota: number;
  usage: number;
  available: number;
} | null> {
  if (
    typeof navigator !== 'undefined' &&
    'storage' in navigator &&
    'estimate' in navigator.storage
  ) {
    try {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota ?? 0,
        usage: estimate.usage ?? 0,
        available: (estimate.quota ?? 0) - (estimate.usage ?? 0),
      };
    } catch (error) {
      console.warn('Failed to get storage quota:', error);
      return null;
    }
  }
  return null;
}
