import type { Request } from 'express';
import type { ZodType } from 'zod';

export function validate<T>(schema: ZodType<T>, request: Request): T {
  return schema.parse({
    params: request.params,
    body: request.body,
    query: request.query,
  });
}
