import { z } from 'zod';

export const envSchema = z.object({
  PG_CONNECTION_STRING: z.coerce.string().min(1),
  JWT_SECRET: z.coerce.string().min(32),
});
