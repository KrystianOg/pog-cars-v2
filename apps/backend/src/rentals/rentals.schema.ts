import { z } from 'zod';

const rentalsSchema = z.object({
  id: z.number(),
  car_id: z.number(),
  user_id: z.number(),
});

export type Rental = z.infer<typeof rentalsSchema>;
