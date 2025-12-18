export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number; // epoch ms
  completedAt?: number; // epoch ms
  xpValue: number; // XP earned when task is completed
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  emotionalState?: 'excited' | 'calm' | 'challenged' | 'satisfied';
  storyChapter?: string; // Links to narrative system
}


