/**
 * Task-related Constants
 * 
 * Centralized constants for task difficulty levels, XP values, and related configurations.
 * This ensures consistency across the application and makes it easy to adjust values.
 */

/**
 * Task difficulty levels
 */
export type TaskDifficulty = 'easy' | 'medium' | 'hard';

/**
 * XP values for each difficulty level
 */
export const XP_VALUES: Record<TaskDifficulty, number> = {
  easy: 10,
  medium: 25,
  hard: 50,
} as const;

/**
 * Default difficulty level
 */
export const DEFAULT_DIFFICULTY: TaskDifficulty = 'medium';

/**
 * Difficulty level display names
 */
export const DIFFICULTY_LABELS: Record<TaskDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const;

/**
 * Difficulty level descriptions with XP values
 */
export const DIFFICULTY_DESCRIPTIONS: Record<TaskDifficulty, string> = {
  easy: `Easy (${XP_VALUES.easy} XP)`,
  medium: `Medium (${XP_VALUES.medium} XP)`,
  hard: `Hard (${XP_VALUES.hard} XP)`,
} as const;

/**
 * Calculate XP value for a given difficulty level
 * 
 * @param difficulty - The difficulty level
 * @returns The XP value for the difficulty level
 */
export function calculateXPValue(difficulty: TaskDifficulty): number {
  return XP_VALUES[difficulty];
}

/**
 * Get all difficulty levels as an array
 */
export function getAllDifficulties(): TaskDifficulty[] {
  return Object.keys(XP_VALUES) as TaskDifficulty[];
}

/**
 * Get difficulty label with XP value
 * 
 * @param difficulty - The difficulty level
 * @returns Formatted string like "Easy (10 XP)"
 */
export function getDifficultyLabel(difficulty: TaskDifficulty): string {
  return DIFFICULTY_DESCRIPTIONS[difficulty];
}

