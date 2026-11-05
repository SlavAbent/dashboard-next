import { z } from 'zod';

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(3000),
  APP_ORIGIN: z.string().url().optional(),
});

const parsed = schema.parse(process.env);

export const env = {
  databaseUrl: parsed.DATABASE_URL,
  port: parsed.PORT,
  appOrigin: parsed.APP_ORIGIN ?? `http://localhost:${parsed.PORT}`,
};
