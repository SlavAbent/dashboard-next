import { z } from 'zod';

export const userIdParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const createUserSchema = z.object({
  body: z.object({
    id: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
  }),
});
