import { z } from 'zod';

export const folderSchema = z.object({
  title: z.string().min(1, 'Folder name is required'),
  columnId: z.string().min(1, 'Column is required'),
});

export type FolderValues = z.infer<typeof folderSchema>;
