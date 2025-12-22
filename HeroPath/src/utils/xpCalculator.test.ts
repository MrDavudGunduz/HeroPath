import { describe, it, expect } from 'vitest';
import {
  calculateXPValue,
  calculateXPToNextLevel,
  calculateTotalXPForLevel,
  calculateLevelFromXP,
  calculateCurrentLevelXP,
  calculateLevelProgressPercentage,
  calculateTasksNeededToLevelUp,
  XP_VALUES,
} from './xpCalculator';
import type { TaskDifficulty } from '../features/tasks/model/constants';

describe('XP Calculator', () => {
  describe('calculateXPValue', () => {
    it('should return correct XP for easy difficulty', () => {
      expect(calculateXPValue('easy')).toBe(10);
    });

    it('should return correct XP for medium difficulty', () => {
      expect(calculateXPValue('medium')).toBe(25);
    });

    it('should return correct XP for hard difficulty', () => {
      expect(calculateXPValue('hard')).toBe(50);
    });

    it('should match XP_VALUES constant', () => {
      expect(calculateXPValue('easy')).toBe(XP_VALUES.easy);
      expect(calculateXPValue('medium')).toBe(XP_VALUES.medium);
      expect(calculateXPValue('hard')).toBe(XP_VALUES.hard);
    });

    it('should throw error for invalid difficulty', () => {
      expect(() => calculateXPValue('invalid' as TaskDifficulty)).toThrow(
        'Invalid difficulty level: invalid'
      );
    });
  });

  describe('calculateXPToNextLevel', () => {
    it('should return base XP for level 1', () => {
      expect(calculateXPToNextLevel(1)).toBe(100);
    });

    it('should return correct XP for level 2', () => {
      // 100 * 1.5^(2-1) = 100 * 1.5 = 150
      expect(calculateXPToNextLevel(2)).toBe(150);
    });

    it('should return correct XP for level 3', () => {
      // 100 * 1.5^(3-1) = 100 * 2.25 = 225
      expect(calculateXPToNextLevel(3)).toBe(225);
    });

    it('should return correct XP for level 5', () => {
      // 100 * 1.5^(5-1) = 100 * 5.0625 = 506.25 -> 506
      expect(calculateXPToNextLevel(5)).toBe(506);
    });

    it('should return correct XP for level 10', () => {
      // 100 * 1.5^9 = 100 * 38.443... = 3844.33... -> 3844
      expect(calculateXPToNextLevel(10)).toBe(3844);
    });

    it('should use exponential progression', () => {
      const level1 = calculateXPToNextLevel(1);
      const level2 = calculateXPToNextLevel(2);
      const level3 = calculateXPToNextLevel(3);

      // Each level should require more XP than the previous
      expect(level2).toBeGreaterThan(level1);
      expect(level3).toBeGreaterThan(level2);

      // Ratio should be approximately 1.5
      const ratio1to2 = level2 / level1;
      const ratio2to3 = level3 / level2;

      expect(ratio1to2).toBeCloseTo(1.5, 1);
      expect(ratio2to3).toBeCloseTo(1.5, 1);
    });

    it('should throw error for level less than 1', () => {
      expect(() => calculateXPToNextLevel(0)).toThrow(
        'Level must be at least 1'
      );
      expect(() => calculateXPToNextLevel(-1)).toThrow(
        'Level must be at least 1'
      );
    });
  });

  describe('calculateTotalXPForLevel', () => {
    it('should return 0 for level 1', () => {
      expect(calculateTotalXPForLevel(1)).toBe(0);
    });

    it('should return base XP for level 2', () => {
      // To reach level 2, need XP for level 1 -> 2
      expect(calculateTotalXPForLevel(2)).toBe(100);
    });

    it('should return sum of XP for level 3', () => {
      // To reach level 3, need: level 1->2 (100) + level 2->3 (150) = 250
      expect(calculateTotalXPForLevel(3)).toBe(250);
    });

    it('should return sum of XP for level 4', () => {
      // To reach level 4, need: 100 + 150 + 225 = 475
      expect(calculateTotalXPForLevel(4)).toBe(475);
    });

    it('should match cumulative XP calculation', () => {
      const level3 = calculateTotalXPForLevel(3);
      const level4 = calculateTotalXPForLevel(4);
      const xpForLevel3 = calculateXPToNextLevel(3);

      expect(level4).toBe(level3 + xpForLevel3);
    });

    it('should throw error for level less than 1', () => {
      expect(() => calculateTotalXPForLevel(0)).toThrow(
        'Target level must be at least 1'
      );
      expect(() => calculateTotalXPForLevel(-1)).toThrow(
        'Target level must be at least 1'
      );
    });
  });

  describe('calculateLevelFromXP', () => {
    it('should return level 1 for 0 XP', () => {
      expect(calculateLevelFromXP(0)).toBe(1);
    });

    it('should return level 1 for XP less than level 1->2 requirement', () => {
      expect(calculateLevelFromXP(50)).toBe(1);
      expect(calculateLevelFromXP(99)).toBe(1);
    });

    it('should return level 2 for XP equal to level 1->2 requirement', () => {
      expect(calculateLevelFromXP(100)).toBe(2);
    });

    it('should return level 2 for XP between level 1->2 and 2->3', () => {
      expect(calculateLevelFromXP(150)).toBe(2);
      expect(calculateLevelFromXP(249)).toBe(2);
    });

    it('should return level 3 for XP equal to level 1->2 + 2->3', () => {
      expect(calculateLevelFromXP(250)).toBe(3);
    });

    it('should return correct level for higher XP values', () => {
      // Level 4 requires 475 total XP
      expect(calculateLevelFromXP(475)).toBe(4);
      expect(calculateLevelFromXP(476)).toBe(4);
      expect(calculateLevelFromXP(700)).toBe(4);
    });

    it('should be inverse of calculateTotalXPForLevel', () => {
      for (let level = 1; level <= 10; level++) {
        const totalXP = calculateTotalXPForLevel(level);
        const calculatedLevel = calculateLevelFromXP(totalXP);
        expect(calculatedLevel).toBe(level);
      }
    });

    it('should throw error for negative XP', () => {
      expect(() => calculateLevelFromXP(-1)).toThrow(
        'Total XP cannot be negative'
      );
    });
  });

  describe('calculateCurrentLevelXP', () => {
    it('should return 0 for level 1 with 0 XP', () => {
      expect(calculateCurrentLevelXP(0, 1)).toBe(0);
    });

    it('should return correct XP for level 1', () => {
      expect(calculateCurrentLevelXP(50, 1)).toBe(50);
      expect(calculateCurrentLevelXP(99, 1)).toBe(99);
    });

    it('should return 0 for level 2 with exactly level 2 total XP', () => {
      const totalXPForLevel2 = calculateTotalXPForLevel(2);
      expect(calculateCurrentLevelXP(totalXPForLevel2, 2)).toBe(0);
    });

    it('should return correct XP for level 2', () => {
      const totalXPForLevel2 = calculateTotalXPForLevel(2); // 100
      expect(calculateCurrentLevelXP(totalXPForLevel2 + 50, 2)).toBe(50);
      expect(calculateCurrentLevelXP(totalXPForLevel2 + 149, 2)).toBe(149);
    });

    it('should return correct XP for level 3', () => {
      const totalXPForLevel3 = calculateTotalXPForLevel(3); // 250
      expect(calculateCurrentLevelXP(totalXPForLevel3 + 100, 3)).toBe(100);
    });

    it('should throw error for negative XP', () => {
      expect(() => calculateCurrentLevelXP(-1, 1)).toThrow(
        'Total XP cannot be negative'
      );
    });

    it('should throw error for invalid level', () => {
      expect(() => calculateCurrentLevelXP(100, 0)).toThrow(
        'Current level must be at least 1'
      );
    });
  });

  describe('calculateLevelProgressPercentage', () => {
    it('should return 0% for start of level', () => {
      const totalXPForLevel2 = calculateTotalXPForLevel(2);
      expect(calculateLevelProgressPercentage(totalXPForLevel2, 2)).toBe(0);
    });

    it('should return 50% for halfway through level', () => {
      const totalXPForLevel2 = calculateTotalXPForLevel(2); // 100
      const xpToNextLevel = calculateXPToNextLevel(2); // 150
      const halfwayXP = totalXPForLevel2 + xpToNextLevel / 2; // 100 + 75 = 175
      expect(calculateLevelProgressPercentage(halfwayXP, 2)).toBe(50);
    });

    it('should return 100% for end of level (just before next level)', () => {
      const totalXPForLevel2 = calculateTotalXPForLevel(2); // 100
      const xpToNextLevel = calculateXPToNextLevel(2); // 150
      const endXP = totalXPForLevel2 + xpToNextLevel - 1; // 100 + 149 = 249
      const percentage = calculateLevelProgressPercentage(endXP, 2);
      expect(percentage).toBeGreaterThan(99);
      expect(percentage).toBeLessThanOrEqual(100);
    });

    it('should return 100% for exactly reaching next level', () => {
      const totalXPForLevel3 = calculateTotalXPForLevel(3); // 250
      expect(calculateLevelProgressPercentage(totalXPForLevel3, 2)).toBe(100);
    });

    it('should handle edge cases', () => {
      expect(calculateLevelProgressPercentage(0, 1)).toBe(0);
      expect(calculateLevelProgressPercentage(50, 1)).toBe(50);
    });
  });

  describe('calculateTasksNeededToLevelUp', () => {
    it('should calculate tasks needed for easy difficulty', () => {
      // Level 1, 0 XP, need 100 XP to level up
      // 100 / 10 = 10 tasks
      expect(calculateTasksNeededToLevelUp(0, 1, 'easy')).toBe(10);
    });

    it('should calculate tasks needed for medium difficulty', () => {
      // Level 1, 0 XP, need 100 XP to level up
      // 100 / 25 = 4 tasks
      expect(calculateTasksNeededToLevelUp(0, 1, 'medium')).toBe(4);
    });

    it('should calculate tasks needed for hard difficulty', () => {
      // Level 1, 0 XP, need 100 XP to level up
      // 100 / 50 = 2 tasks
      expect(calculateTasksNeededToLevelUp(0, 1, 'hard')).toBe(2);
    });

    it('should account for existing XP in current level', () => {
      // Level 1, 50 XP, need 50 more XP to level up
      // 50 / 25 = 2 tasks
      expect(calculateTasksNeededToLevelUp(50, 1, 'medium')).toBe(2);
    });

    it('should round up when XP needed is not divisible', () => {
      // Level 1, 90 XP, need 10 more XP to level up
      // 10 / 25 = 0.4 -> 1 task (rounded up)
      expect(calculateTasksNeededToLevelUp(90, 1, 'medium')).toBe(1);
    });

    it('should calculate for higher levels', () => {
      // Level 2, 100 XP (just reached level 2), need 150 XP to level up
      // 150 / 25 = 6 tasks
      const totalXPForLevel2 = calculateTotalXPForLevel(2);
      expect(calculateTasksNeededToLevelUp(totalXPForLevel2, 2, 'medium')).toBe(
        6
      );
    });

    it('should handle partial progress in level', () => {
      // Level 2, 100 + 75 = 175 XP, need 75 more XP to level up
      // 75 / 25 = 3 tasks
      const totalXPForLevel2 = calculateTotalXPForLevel(2);
      const xpToNextLevel = calculateXPToNextLevel(2);
      const currentXP = totalXPForLevel2 + xpToNextLevel / 2;
      expect(calculateTasksNeededToLevelUp(currentXP, 2, 'medium')).toBe(3);
    });
  });

  describe('Integration tests', () => {
    it('should maintain consistency across all functions', () => {
      const testCases = [
        { totalXP: 0, expectedLevel: 1 },
        { totalXP: 100, expectedLevel: 2 },
        { totalXP: 250, expectedLevel: 3 },
        { totalXP: 475, expectedLevel: 4 },
      ];

      testCases.forEach(({ totalXP, expectedLevel }) => {
        const calculatedLevel = calculateLevelFromXP(totalXP);
        expect(calculatedLevel).toBe(expectedLevel);

        const totalXPForLevel = calculateTotalXPForLevel(expectedLevel);
        expect(totalXP).toBeGreaterThanOrEqual(totalXPForLevel);

        const currentLevelXP = calculateCurrentLevelXP(totalXP, expectedLevel);
        const xpToNextLevel = calculateXPToNextLevel(expectedLevel);
        expect(currentLevelXP).toBeLessThanOrEqual(xpToNextLevel);
      });
    });

    it('should correctly calculate progression from level 1 to 5', () => {
      let totalXP = 0;
      let level = 1;

      for (let i = 1; i <= 5; i++) {
        const xpToNext = calculateXPToNextLevel(level);
        const totalXPForNext = calculateTotalXPForLevel(level + 1);

        expect(totalXPForNext).toBe(totalXP + xpToNext);

        totalXP = totalXPForNext;
        level++;
      }
    });
  });
});
