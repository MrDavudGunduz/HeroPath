import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskId } from './task';
import { taskDraftSchema } from './validation';

type TaskDraft = {
  title: string;
  description?: string;
};

export interface TaskState {
  tasks: Task[];
  lastError?: string;

  addTask: (draft: TaskDraft) => void;
  toggleTask: (id: TaskId) => void;
  removeTask: (id: TaskId) => void;
  clearCompleted: () => void;
  clearError: () => void;
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

      addTask: ({ title, description }) => {
        const parsed = taskDraftSchema.safeParse({ title, description });
        if (!parsed.success) {
          const message = parsed.error.issues[0]?.message ?? 'Invalid task input';
          set({ lastError: message });
          return;
        }

        const now = Date.now();
        const task: Task = {
          id: makeId(),
          title: parsed.data.title,
          description:
            parsed.data.description && parsed.data.description.trim()
              ? parsed.data.description.trim()
              : undefined,
          completed: false,
          createdAt: now,
        };

        set((state) => ({ tasks: [task, ...state.tasks], lastError: undefined }));
      },

      toggleTask: (id) => {
        const now = Date.now();
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  completed: !t.completed,
                  completedAt: t.completed ? undefined : now,
                }
              : t,
          ),
        }));
      },

      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      clearCompleted: () =>
        set((state) => ({ tasks: state.tasks.filter((t) => !t.completed) })),

      clearError: () => set({ lastError: undefined }),
    }),
    {
      name: 'heropath.tasks.v1',
      version: 1,
    },
  ),
);


