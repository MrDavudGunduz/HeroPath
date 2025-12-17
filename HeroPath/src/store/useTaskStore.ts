import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskId } from '../types/task';

type TaskDraft = {
  title: string;
  description?: string;
};

interface TaskState {
  tasks: Task[];

  addTask: (draft: TaskDraft) => void;
  toggleTask: (id: TaskId) => void;
  removeTask: (id: TaskId) => void;
  clearCompleted: () => void;
}

function makeId(): TaskId {
  // Prefer collision-resistant, native UUIDs in modern browsers.
  // Fallback keeps it working in older environments without Web Crypto.
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],

      addTask: ({ title, description }) => {
        const trimmed = title.trim();
        if (!trimmed) return;

        const now = Date.now();
        const task: Task = {
          id: makeId(),
          title: trimmed,
          description: description?.trim() ? description.trim() : undefined,
          completed: false,
          createdAt: now,
        };

        set((state) => ({ tasks: [task, ...state.tasks] }));
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
    }),
    {
      name: 'heropath.tasks.v1',
      version: 1,
    },
  ),
);


