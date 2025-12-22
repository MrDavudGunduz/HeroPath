/**
 * Storage Health Hook
 * 
 * Provides utilities to monitor and manage localStorage health,
 * including quota monitoring, error handling, and cleanup.
 */

import { useEffect, useState, useCallback } from 'react';
import { quotaManager } from '../utils/persistence';
import type { StorageError } from '../utils/storage';

export interface StorageHealth {
  /** Current storage usage in bytes */
  current: number;
  /** Maximum storage capacity in bytes */
  max: number;
  /** Usage percentage (0-100) */
  percentage: number;
  /** Available space in bytes */
  available: number;
  /** Whether storage is available */
  isAvailable: boolean;
  /** Whether usage is above warning threshold */
  warning: boolean;
  /** Last error encountered */
  lastError: StorageError | null;
}

/**
 * Hook to monitor localStorage health and quota
 */
export function useStorageHealth() {
  const [health, setHealth] = useState<StorageHealth>(() => {
    const usage = quotaManager.getUsage();
    const quota = quotaManager.checkQuota();
    
    return {
      current: usage.current,
      max: usage.max,
      percentage: usage.percentage,
      available: usage.available,
      isAvailable: quota.available,
      warning: quota.warning,
      lastError: null,
    };
  });

  const refresh = useCallback(() => {
    try {
      const usage = quotaManager.getUsage();
      const quota = quotaManager.checkQuota();
      
      setHealth((prev) => ({
        ...prev,
        current: usage.current,
        max: usage.max,
        percentage: usage.percentage,
        available: usage.available,
        isAvailable: quota.available,
        warning: quota.warning,
      }));
    } catch (error) {
      setHealth((prev) => ({
        ...prev,
        lastError: {
          code: 'UNKNOWN',
          message: error instanceof Error ? error.message : 'Unknown error',
          originalError: error,
        },
      }));
    }
  }, []);

  const cleanup = useCallback((keysToPreserve: string[] = []) => {
    try {
      const cleaned = quotaManager.cleanup(keysToPreserve);
      refresh();
      return cleaned;
    } catch (error) {
      const storageError: StorageError = {
        code: 'UNKNOWN',
        message: error instanceof Error ? error.message : 'Cleanup failed',
        originalError: error,
      };
      setHealth((prev) => ({ ...prev, lastError: storageError }));
      return 0;
    }
  }, [refresh]);

  // Refresh on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    health,
    refresh,
    cleanup,
  };
}

/**
 * Hook to handle storage errors globally
 */
export function useStorageErrorHandler(
  onError?: (error: StorageError) => void,
) {
  useEffect(() => {
    const handleStorageError = (event: StorageEvent) => {
      // Handle storage events if needed
      if (event.key && event.key.startsWith('heropath.')) {
        console.warn('Storage event detected:', event);
      }
    };

    window.addEventListener('storage', handleStorageError);

    return () => {
      window.removeEventListener('storage', handleStorageError);
    };
  }, [onError]);
}

