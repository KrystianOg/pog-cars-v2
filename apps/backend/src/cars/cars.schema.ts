import { z } from 'zod';
import { MAX_INT_32 } from '../constants/int';

export const carSchema = z.object({
  mileage: z.number().nonnegative().max(MAX_INT_32),
  horsepower: z.number().nonnegative().max(20_000),
  seats: z.number().positive().max(300),
  drivetrain: z.enum(['FWD', 'RWD', '4WD', 'AWD']),
  price: z.number().max(50_000).nonnegative(), // TODO: extract price to separate column
  year: z.number().min(1886).max(new Date().getFullYear()),
  model: z.string().max(64).min(1),
  make: z.string().max(64).min(1),
});

export type CreateCarDto = z.infer<typeof carSchema>;

export type Car = CreateCarDto & { id: number };
