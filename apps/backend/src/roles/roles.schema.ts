import { z } from 'zod';

const roleSchema = z.object({
  id: z.number(),
  agency_id: z.number(),
  name: z.string().max(32),
  description: z.string().optional(),
});

export const roleCreateSchema = roleSchema.omit({
  id: true,
});

export type Role = z.infer<typeof roleSchema>;
export type RoleCreate = z.infer<typeof roleCreateSchema>;
/**
 * permissions don't have create schema as they are created
 * by migration
 */
const permissionSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
});
