import { z } from 'zod';
import { DEFAULT_DIFFICULTY, getAllDifficulties } from './constants';

export const taskDraftSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Task title must be at least 3 characters')
    .max(120, 'Task title is too long (max 120 chars)'),
  description: z
    .string()
    .trim()
    .max(2000, 'Description is too long (max 2000 chars)')
    .optional()
    .or(z.literal('')),
  difficulty: z
    .enum(getAllDifficulties() as [string, ...string[]])
    .optional()
    .default(DEFAULT_DIFFICULTY),
  category: z.string().trim().max(50, 'Category is too long (max 50 chars)').optional(),
  emotionalState: z
    .enum(['excited', 'calm', 'challenged', 'satisfied'])
    .optional(),
  storyChapter: z.string().trim().max(100, 'Story chapter is too long (max 100 chars)').optional(),
  xpValue: z.number().int().min(1).max(1000).optional(),
});

export type TaskDraftInput = z.input<typeof taskDraftSchema>;
export type TaskDraft = z.output<typeof taskDraftSchema>;


