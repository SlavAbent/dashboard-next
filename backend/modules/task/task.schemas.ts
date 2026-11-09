import { z } from 'zod';

import {
  optionalScheduleFields,
  scheduleFields,
  validateDateRange,
} from '../../shared/schedule.ts';

export const taskIdParamsSchema = z.object({
  id: z.string().min(1).max(128),
});

export const createTaskSchema = z
  .object({
    taskFolderId: z.string().min(1).max(128),
    text: z.string().trim().min(1).max(2000),
    tags: z.array(z.string().trim().min(1).max(64)).max(20),
    completed: z.boolean(),
    order: z.number().finite(),
    ...scheduleFields,
  })
  .superRefine(validateDateRange);

export const updateTaskSchema = z
  .object({
    text: z.string().trim().min(1).max(2000).optional(),
    tags: z.array(z.string().trim().min(1).max(64)).max(20).optional(),
    completed: z.boolean().optional(),
    taskFolderId: z.string().min(1).max(128).optional(),
    ...optionalScheduleFields,
  })
  .strict()
  .refine(
    (value) => Object.keys(value).length > 0,
    'At least one field is required'
  )
  .superRefine(validateDateRange);

export const moveTaskSchema = z.object({
  taskFolderId: z.string().min(1).max(128),
  order: z.number().finite(),
});
