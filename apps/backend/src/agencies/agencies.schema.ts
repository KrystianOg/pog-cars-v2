import { z } from 'zod';

const countryEnum = z.enum(['PL', 'DE', 'FR', 'US']);

export type Country = z.infer<typeof countryEnum>;

// address schema related
const addressSchema = z.object({
  id: z.number().min(0),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: countryEnum,
});

export type Address = z.infer<typeof addressSchema>;

export const addressCreateSchema = addressSchema.omit({
  id: true,
});

export type CreateAddressDto = z.infer<typeof addressCreateSchema>;

// agency schema related
const agencySchema = z.object({
  id: z.number().min(0),
  name: z.string().max(128),
  address: addressSchema,
});

export type Agency = z.infer<typeof agencySchema>;

export const agencyCreateSchema = agencySchema.omit({
  id: true,
});

export type CreateAgencyDto = z.infer<typeof agencyCreateSchema>;

