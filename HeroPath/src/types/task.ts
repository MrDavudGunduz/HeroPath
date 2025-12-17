export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number; // epoch ms
  completedAt?: number; // epoch ms
}


