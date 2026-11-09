import { z } from 'zod';

import { priorities } from '@/shared/model/schedule';

export const taskSchema = z
  .object({
    taskValue: z.string().min(1, 'Task name is required'),
    folderId: z.string().min(1, 'Folder is required'),
    completed: z.boolean(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    priority: z.enum(priorities),
  })
  .superRefine((value, context) => {
    if ((value.startDate == null) !== (value.endDate == null)) {
      context.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'Select an end date',
      });
    } else if (
      value.startDate &&
      value.endDate &&
      value.startDate > value.endDate
    ) {
      context.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'The end date cannot be earlier than the start date',
      });
    }
  });

export type TaskFormValues = z.infer<typeof taskSchema>;
