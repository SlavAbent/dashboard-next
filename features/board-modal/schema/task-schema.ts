import { z } from 'zod';

export const taskSchema = z.object({
  taskValue: z.string(),
  //TODO revalidate data in number
  folderId: z.union([z.string(), z.number()]),
  completed: z.boolean(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
