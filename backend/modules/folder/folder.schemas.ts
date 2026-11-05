import { z } from 'zod';

export const folderIdParamsSchema = z.object({
  id: z.string().min(1).max(128),
});

export const createFolderSchema = z.object({
  columnId: z.string().min(1).max(64),
  title: z.string().trim().min(1).max(120),
  order: z.number().finite(),
});

export const updateFolderSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),
    order: z.number().finite().optional(),
  })
  .strict()
  .refine(
    (value) => Object.keys(value).length > 0,
    'At least one field is required'
  );

export const moveFolderSchema = z.object({
  columnId: z.string().min(1).max(64),
  order: z.number().finite().optional(),
});
