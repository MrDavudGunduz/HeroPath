/**
 * XP Calculator
 * 
 * Centralized XP calculation logic for the HeroPath application.
 * Handles task XP values, level progression, and XP-related calculations.
 */

import type { TaskDifficulty } from '../features/tasks/model/constants';

/**
 * XP values for each difficulty level
 */
export const XP_VALUES: Record<TaskDifficulty, number> = {
  easy: 10,
  medium: 25,
  hard: 50,
} as const;

/**
 * Base XP required for level 1 to level 2
 */
const BASE_XP = 100;

/**
 * XP multiplier for exponential progression
 */
const XP_MULTIPLIER = 1.5;

/**
 * Calculate XP value for a given difficulty level
 * 
 * @param difficulty - The difficulty level
 * @returns The XP value for the difficulty level
 * @throws {Error} If difficulty is invalid
 */
export function calculateXPValue(difficulty: TaskDifficulty): number {
  if (!(difficulty in XP_VALUES)) {
    throw new Error(`Invalid difficulty level: ${difficulty}`);
  }
  return XP_VALUES[difficulty];
}

/**
 * Calculate XP required to reach the next level
 * Uses exponential progression: BASE_XP * (MULTIPLIER ^ (level - 1))
 * 
 * @param level - Current level (1-based)
 * @returns XP required to reach level + 1
 * @throws {Error} If level is less than 1
 */
export function calculateXPToNextLevel(level: number): number {
  if (level < 1) {
    throw new Error(`Level must be at least 1, got: ${level}`);
  }
  return Math.floor(BASE_XP * Math.pow(XP_MULTIPLIER, level - 1));
}

/**
 * Calculate total XP required to reach a specific level
 * 
 * @param targetLevel - Target level (1-based)
 * @returns Total XP required to reach targetLevel from level 1
 * @throws {Error} If targetLevel is less than 1
 */
export function calculateTotalXPForLevel(targetLevel: number): number {
  if (targetLevel < 1) {
    throw new Error(`Target level must be at least 1, got: ${targetLevel}`);
  }
  
  if (targetLevel === 1) {
    return 0;
  }
  
  let totalXP = 0;
  for (let level = 1; level < targetLevel; level++) {
    totalXP += calculateXPToNextLevel(level);
  }
  
  return totalXP;
}

/**
 * Calculate level from total XP
 * 
 * @param totalXP - Total XP accumulated
 * @returns The level corresponding to the total XP
 */
export function calculateLevelFromXP(totalXP: number): number {
  if (totalXP < 0) {
    throw new Error(`Total XP cannot be negative, got: ${totalXP}`);
  }
  
  if (totalXP === 0) {
    return 1;
  }
  
  let level = 1;
  let accumulatedXP = 0;
  
  while (accumulatedXP < totalXP) {
    const xpForNextLevel = calculateXPToNextLevel(level);
    if (accumulatedXP + xpForNextLevel > totalXP) {
      break;
    }
    accumulatedXP += xpForNextLevel;
    level++;
  }
  
  return level;
}

/**
 * Calculate current XP progress within the current level
 * 
 * @param totalXP - Total XP accumulated
 * @param currentLevel - Current level
 * @returns Current XP within the current level (0 to xpToNextLevel)
 */
export function calculateCurrentLevelXP(totalXP: number, currentLevel: number): number {
  if (totalXP < 0) {
    throw new Error(`Total XP cannot be negative, got: ${totalXP}`);
  }
  
  if (currentLevel < 1) {
    throw new Error(`Current level must be at least 1, got: ${currentLevel}`);
  }
  
  const totalXPForCurrentLevel = calculateTotalXPForLevel(currentLevel);
  return totalXP - totalXPForCurrentLevel;
}

/**
 * Calculate XP progress percentage for current level
 * 
 * @param totalXP - Total XP accumulated
 * @param currentLevel - Current level
 * @returns Progress percentage (0-100)
 */
export function calculateLevelProgressPercentage(totalXP: number, currentLevel: number): number {
  const currentLevelXP = calculateCurrentLevelXP(totalXP, currentLevel);
  const xpToNextLevel = calculateXPToNextLevel(currentLevel);
  
  if (xpToNextLevel === 0) {
    return 100;
  }
  
  const percentage = (currentLevelXP / xpToNextLevel) * 100;
  return Math.min(100, Math.max(0, Math.round(percentage * 100) / 100));
}

/**
 * Calculate how many tasks of a given difficulty are needed to level up
 * 
 * @param currentTotalXP - Current total XP
 * @param currentLevel - Current level
 * @param difficulty - Task difficulty
 * @returns Number of tasks needed (rounded up)
 */
export function calculateTasksNeededToLevelUp(
  currentTotalXP: number,
  currentLevel: number,
  difficulty: TaskDifficulty,
): number {
  const xpToNextLevel = calculateXPToNextLevel(currentLevel);
  const currentLevelXP = calculateCurrentLevelXP(currentTotalXP, currentLevel);
  const xpNeeded = xpToNextLevel - currentLevelXP;
  const xpPerTask = calculateXPValue(difficulty);
  
  if (xpPerTask === 0) {
    return Infinity;
  }
  
  return Math.ceil(xpNeeded / xpPerTask);
}
