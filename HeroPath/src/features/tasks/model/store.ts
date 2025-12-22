import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskId } from './task';
import { taskDraftSchema } from './validation';
import { useProgressStore } from '../../../store/useProgressStore';
import { createHeroPathStorage } from '../../../utils/zustandStorage';
import { createTaskStoreMigrations } from '../../../utils/migrations';
import {
  calculateXPValue,
  DEFAULT_DIFFICULTY,
  type TaskDifficulty,
} from './constants';

type TaskDraft = {
  title: string;
  description?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  emotionalState?: 'excited' | 'calm' | 'challenged' | 'satisfied';
  storyChapter?: string;
  xpValue?: number;
};

export interface TaskState {
  tasks: Task[];
  lastError?: string;

  addTask: (draft: TaskDraft) => void;
  toggleTask: (id: TaskId) => void;
  removeTask: (id: TaskId) => void;
  updateTask: (id: TaskId, updates: Partial<Task>) => void;
  clearCompleted: () => void;
  clearError: () => void;
  getTasksByCategory: (category: string) => Task[];
  getTasksByDifficulty: (difficulty: TaskDifficulty) => Task[];
}

function makeId(): TaskId {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      lastError: undefined,

      addTask: (draft) => {
        const parsed = taskDraftSchema.safeParse(draft);
        if (!parsed.success) {
          const message = parsed.error.issues[0]?.message ?? 'Invalid task input';
          set({ lastError: message });
          return;
        }

        const now = Date.now();
        const difficulty = (parsed.data.difficulty ?? DEFAULT_DIFFICULTY) as TaskDifficulty;
        const xpValue = parsed.data.xpValue ?? calculateXPValue(difficulty);

        const task: Task = {
          id: makeId(),
          title: parsed.data.title,
          description:
            parsed.data.description && parsed.data.description.trim()
              ? parsed.data.description.trim()
              : undefined,
          completed: false,
          createdAt: now,
          xpValue,
          difficulty,
          category: parsed.data.category?.trim() || undefined,
          emotionalState: parsed.data.emotionalState,
          storyChapter: parsed.data.storyChapter?.trim() || undefined,
        };

        set((state) => ({ tasks: [task, ...state.tasks], lastError: undefined }));
      },

      toggleTask: (id) => {
        const now = Date.now();
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (!task) return state;

          const wasCompleted = task.completed;
          const isNowCompleted = !wasCompleted;

          // If task is being completed, add XP to progress
          if (isNowCompleted) {
            const { completeTask, incrementStreak } = useProgressStore.getState();
            completeTask(task.xpValue, task.category);
            incrementStreak();
          }

          return {
            tasks: state.tasks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    completed: isNowCompleted,
                    completedAt: isNowCompleted ? now : undefined,
                  }
                : t,
            ),
          };
        });
      },

      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      updateTask: (id, updates) => {
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (!task) return state;

          // If difficulty is being updated, recalculate XP if not explicitly provided
          let updatedXP = updates.xpValue;
          if (updates.difficulty && !updates.xpValue) {
            updatedXP = calculateXPValue(updates.difficulty);
          }

          return {
            tasks: state.tasks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    ...updates,
                    ...(updatedXP !== undefined && { xpValue: updatedXP }),
                  }
                : t,
            ),
            lastError: undefined,
          };
        });
      },

      clearCompleted: () =>
        set((state) => ({ tasks: state.tasks.filter((t) => !t.completed) })),

      clearError: () => set({ lastError: undefined }),

      getTasksByCategory: (category) => {
        const state = useTaskStore.getState();
        return state.tasks.filter(
          (task) => task.category?.toLowerCase() === category.toLowerCase(),
        );
      },

      getTasksByDifficulty: (difficulty) => {
        const state = useTaskStore.getState();
        return state.tasks.filter((task) => task.difficulty === difficulty);
      },
    }),
    {
      name: 'tasks.v1',
      version: 1,
      storage: createHeroPathStorage('tasks.v1', 1, createTaskStoreMigrations()),
    },
  ),
);


