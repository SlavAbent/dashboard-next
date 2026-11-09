import { z } from 'zod';

export const priorities = [
  'none',
  'low',
  'medium',
  'high',
  'critical',
] as const;

export type Priority = (typeof priorities)[number];

export const prioritySchema = z.enum(priorities);
export const dateOnlySchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected a date in YYYY-MM-DD format')
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)), {
    message: 'Expected a valid date',
  });

export const scheduleFields = {
  startDate: dateOnlySchema.nullable(),
  endDate: dateOnlySchema.nullable(),
  priority: prioritySchema,
};

export const optionalScheduleFields = {
  startDate: dateOnlySchema.nullable().optional(),
  endDate: dateOnlySchema.nullable().optional(),
  priority: prioritySchema.optional(),
};

export const validateDateRange = (
  value: { startDate?: string | null; endDate?: string | null },
  context: z.RefinementCtx
) => {
  const hasStartDate = value.startDate != null;
  const hasEndDate = value.endDate != null;

  if (hasStartDate !== hasEndDate) {
    context.addIssue({
      code: 'custom',
      path: hasStartDate ? ['endDate'] : ['startDate'],
      message: 'Start and end dates must be set together',
    });
    return;
  }

  if (value.startDate && value.endDate && value.startDate > value.endDate) {
    context.addIssue({
      code: 'custom',
      path: ['endDate'],
      message: 'End date must not be earlier than start date',
    });
  }
};

export const toDatabaseDate = (value: string | null | undefined) =>
  value == null ? value : new Date(`${value}T00:00:00.000Z`);

export const toDateOnly = (value: Date | null) =>
  value ? value.toISOString().slice(0, 10) : null;
