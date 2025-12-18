import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress, HeroCharacter, SkillTree } from '../types/progress';

export interface ProgressState {
  progress: UserProgress;

  // XP and Level Management
  addXP: (amount: number, skillCategory?: keyof SkillTree) => void;
  levelUp: () => void;
  calculateXPToNextLevel: (level: number) => number;

  // Task Completion
  completeTask: (xpValue: number, category?: string) => void;
  incrementStreak: () => void;
  resetStreak: () => void;

  // Character Management
  updateCharacterLevel: (level: number) => void;
  unlockOutfit: (outfit: string) => void;
  setCurrentOutfit: (outfit: string) => void;

  // Skill Tree Management
  updateSkill: (category: keyof SkillTree, amount: number) => void;
}

const calculateXPToNextLevel = (level: number): number => {
  // Exponential XP curve: each level requires more XP
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

const initialHeroCharacter: HeroCharacter = {
  level: 1,
  appearance: 'default',
  unlockedOutfits: ['default'],
  currentOutfit: 'default',
};

const initialSkillTree: SkillTree = {
  productivity: 0,
  creativity: 0,
  health: 0,
  learning: 0,
  social: 0,
};

const initialProgress: UserProgress = {
  level: 1,
  currentXP: 0,
  totalXP: 0,
  xpToNextLevel: calculateXPToNextLevel(1),
  completedTasksCount: 0,
  streak: 0,
  heroCharacter: initialHeroCharacter,
  skillTree: initialSkillTree,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      calculateXPToNextLevel,

      addXP: (amount, skillCategory) => {
        set((state) => {
          const newTotalXP = state.progress.totalXP + amount;
          const newCurrentXP = state.progress.currentXP + amount;
          let newLevel = state.progress.level;
          let xpToNextLevel = state.progress.xpToNextLevel;

          // Check for level up
          let remainingXP = newCurrentXP;
          while (remainingXP >= xpToNextLevel) {
            remainingXP -= xpToNextLevel;
            newLevel += 1;
            xpToNextLevel = calculateXPToNextLevel(newLevel);
          }

          const updatedProgress: UserProgress = {
            ...state.progress,
            level: newLevel,
            currentXP: remainingXP,
            totalXP: newTotalXP,
            xpToNextLevel,
            heroCharacter: {
              ...state.progress.heroCharacter,
              level: newLevel,
            },
          };

          // Update skill tree if category provided
          if (skillCategory) {
            updatedProgress.skillTree = {
              ...state.progress.skillTree,
              [skillCategory]: state.progress.skillTree[skillCategory] + amount,
            };
          }

          return { progress: updatedProgress };
        });

        // Check if leveled up and trigger level up logic
        const currentLevel = get().progress.level;
        if (currentLevel > get().progress.heroCharacter.level) {
          get().levelUp();
        }
      },

      levelUp: () => {
        set((state) => {
          const newLevel = state.progress.level;
          return {
            progress: {
              ...state.progress,
              heroCharacter: {
                ...state.progress.heroCharacter,
                level: newLevel,
              },
            },
          };
        });
      },

      completeTask: (xpValue, category) => {
        const state = get();
        
        // Map category to skill tree category if applicable
        const skillCategoryMap: Record<string, keyof SkillTree> = {
          productivity: 'productivity',
          creativity: 'creativity',
          health: 'health',
          learning: 'learning',
          social: 'social',
        };
        
        const skillCategory = category ? skillCategoryMap[category.toLowerCase()] : undefined;
        
        state.addXP(xpValue, skillCategory);
        
        set((prevState) => ({
          progress: {
            ...prevState.progress,
            completedTasksCount: prevState.progress.completedTasksCount + 1,
          },
        }));
      },

      incrementStreak: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            streak: state.progress.streak + 1,
          },
        }));
      },

      resetStreak: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            streak: 0,
          },
        }));
      },

      updateCharacterLevel: (level) => {
        set((state) => ({
          progress: {
            ...state.progress,
            heroCharacter: {
              ...state.progress.heroCharacter,
              level,
            },
          },
        }));
      },

      unlockOutfit: (outfit) => {
        set((state) => {
          if (state.progress.heroCharacter.unlockedOutfits.includes(outfit)) {
            return state; // Already unlocked
          }
          return {
            progress: {
              ...state.progress,
              heroCharacter: {
                ...state.progress.heroCharacter,
                unlockedOutfits: [...state.progress.heroCharacter.unlockedOutfits, outfit],
              },
            },
          };
        });
      },

      setCurrentOutfit: (outfit) => {
        set((state) => {
          if (!state.progress.heroCharacter.unlockedOutfits.includes(outfit)) {
            return state; // Cannot set outfit that's not unlocked
          }
          return {
            progress: {
              ...state.progress,
              heroCharacter: {
                ...state.progress.heroCharacter,
                currentOutfit: outfit,
              },
            },
          };
        });
      },

      updateSkill: (category, amount) => {
        set((state) => ({
          progress: {
            ...state.progress,
            skillTree: {
              ...state.progress.skillTree,
              [category]: Math.max(0, state.progress.skillTree[category] + amount),
            },
          },
        }));
      },
    }),
    {
      name: 'heropath.progress.v1',
      version: 1,
    },
  ),
);
