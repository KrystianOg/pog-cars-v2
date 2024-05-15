import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().positive().optional().default(1),
  pageSize: z
    .union([z.literal(10), z.literal(25), z.literal(50), z.literal(100)])
    .optional()
    .default(25),
});

export type Pagination = z.infer<typeof paginationSchema>;
