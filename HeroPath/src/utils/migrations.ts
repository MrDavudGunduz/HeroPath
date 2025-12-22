/**
 * Data Migration Examples
 *
 * This file contains migration functions for different data versions.
 * Add new migrations here when updating data structures.
 */

import { StorageMigration } from './storage';

/**
 * Example: Task store migration from v1 to v2
 * If we add new fields to Task interface, we need to migrate old data
 */
export function createTaskStoreMigrations(): StorageMigration {
  const migration = new StorageMigration(1); // Current version

  // Example migration for future versions:
  // migration.addMigration(2, (data: any) => {
  //   // Migrate from v1 to v2
  //   if (data && data.tasks && Array.isArray(data.tasks)) {
  //     return {
  //       ...data,
  //       tasks: data.tasks.map((task: any) => ({
  //         ...task,
  //         // Add default values for new fields
  //         xpValue: task.xpValue ?? 25,
  //         difficulty: task.difficulty ?? 'medium',
  //       })),
  //     };
  //   }
  //   return data;
  // });

  return migration;
}

/**
 * Example: Progress store migration
 */
export function createProgressStoreMigrations(): StorageMigration {
  const migration = new StorageMigration(1); // Current version

  // Example migration for future versions:
  // migration.addMigration(2, (data: any) => {
  //   if (data && data.progress) {
  //     return {
  //       ...data,
  //       progress: {
  //         ...data.progress,
  //         // Add new fields with defaults
  //         newField: data.progress.newField ?? defaultValue,
  //       },
  //     };
  //   }
  //   return data;
  // });

  return migration;
}

/**
 * Helper to check and migrate all stores
 */
export function migrateAllStores(): void {
  // This can be called on app initialization
  // to ensure all stores are migrated
  console.log('Checking for data migrations...');

  // Migrations are handled automatically by the storage system
  // when data is loaded
}
