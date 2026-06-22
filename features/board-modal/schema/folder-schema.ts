import { z } from 'zod';

export const folderSchema = z.object({
  folderValue: z.string(),
  title: z.string(),
  columnId: z.string(),
});

export type FolderValues = z.infer<typeof folderSchema>;
