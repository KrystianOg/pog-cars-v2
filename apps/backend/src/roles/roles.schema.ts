import { z } from 'zod';

export const schemaBase = z.object({
  created_at: z.string().date(),
  updated_at: z.string().date(),
  deleted_at: z.string().date().optional(),
});

const roleSchema = z
  .object({
    id: z.number(),
    agency_id: z.number(),
    name: z.string().max(32),
    description: z.string().optional(),
  })
  .extend(schemaBase.shape);

export const roleCreateSchema = roleSchema.omit({
  id: true,
  created_at: true,
  deleted_at: true,
  updated_at: true,
});

export type Role = z.infer<typeof roleSchema>;
export type RoleCreate = z.infer<typeof roleCreateSchema>;
/**
 * permissions don't have create schema as they are created
 * by migration
 */
const permissionSchema = z
  .object({
    id: z.string(),
    description: z.string().optional(),
  })
  .extend(schemaBase.shape);
