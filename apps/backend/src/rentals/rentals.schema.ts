import { z } from 'zod';
import { schemaBase } from 'src/roles/roles.schema';

const rentalsSchema = z
  .object({
    id: z.number(),
    car_id: z.number(),
    user_id: z.number(),
  })
  .extend(schemaBase.shape);

export type Rental = z.infer<typeof rentalsSchema>;
