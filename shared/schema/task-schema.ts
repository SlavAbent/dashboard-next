import { z } from 'zod';

export const taskSchema = z.object({
  taskValue: z.string().min(1, 'Task name is required'),
  folderId: z.string().min(1, 'Folder is required'),
  completed: z.boolean(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
