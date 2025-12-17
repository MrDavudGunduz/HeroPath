import { z } from 'zod';

export const taskDraftSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task title is required')
    .max(120, 'Task title is too long (max 120 chars)'),
  description: z
    .string()
    .trim()
    .max(2000, 'Description is too long (max 2000 chars)')
    .optional()
    .or(z.literal('')),
});

export type TaskDraftInput = z.input<typeof taskDraftSchema>;
export type TaskDraft = z.output<typeof taskDraftSchema>;


