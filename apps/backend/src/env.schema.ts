import { z } from 'zod';

export const envSchema = z.object({
  JWT_SECRET: z.coerce.string().min(32),
  NODE_ENV: z.enum(['test', 'development', 'staging', 'production']),

  POSTGRES_USER: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.coerce.number(),
});
