import { z } from 'zod';

export const carSchema = z.object({
  id: z.number().min(0),
  mileage: z.number().min(0),
  horsepower: z.number().min(0),
  seats: z.number().min(1),
  drivetrain: z.enum(['FWD', 'RWD', '4WD', 'AWD']),
  price: z.number().min(0),
  year: z.number().min(1886),
  model: z.string().max(64),
  make: z.string().max(64),
});

export type Car = z.infer<typeof carSchema>;

export const carCreateSchema = carSchema.omit({
  id: true,
});

export type CreateCarDto = z.infer<typeof carCreateSchema>;
