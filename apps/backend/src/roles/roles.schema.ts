import { z } from 'zod';

const roleSchema = z.object({
  id: z.number(),
  agency_id: z.number(),
  name: z.string().max(32),
  description: z.string().optional(),
});

export const roleCreateSchema = roleSchema
  .omit({
    id: true,
  })
  .extend({
    permissionIds: z.number().array().min(1),
  });

export type Role = z.infer<typeof roleSchema>;
export type CreateRoleDto = z.infer<typeof roleCreateSchema>;
