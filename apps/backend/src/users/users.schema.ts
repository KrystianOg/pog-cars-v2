import { z } from 'zod';

const userSchema = z.object({
  id: z.number().min(0),
  username: z.string().max(32).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type User = z.infer<typeof userSchema>;

export const userCreateSchema = userSchema.omit({
  id: true,
});

export type UserCreate = z.infer<typeof userCreateSchema>;

export const userUpdateSchema = userSchema.partial().extend({
  id: userSchema.shape.id,
});

export type UserUpdate = z.infer<typeof userUpdateSchema>;
