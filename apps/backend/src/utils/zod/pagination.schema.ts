import { z } from 'zod';

/**
 * Used as query params so coerce from string
 */
export const paginationSchema = z.object({
  page: z.coerce.number().positive().default(1),
  pageSize: z.coerce.number().min(10).max(100).default(25),
});

export type Pagination = z.infer<typeof paginationSchema>;
