import { z } from 'zod';

const countryEnum = z.enum(['PL', 'DE', 'FR', 'US']);

export type Country = z.infer<typeof countryEnum>;

// address schema related
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: countryEnum,
});

export type CreateAddressDto = z.infer<typeof addressSchema>;
export type Address = CreateAddressDto & { id: number };

export const configSchema = z
  .object({
    backgroundColor: z.string().regex(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/), // hex at first
  })
  .partial();

export type CreateConfigDto = z.infer<typeof configSchema>;

export type AgencyConfig = z.infer<typeof configSchema>;

// agency schema related
export const agencySchema = z.object({
  name: z.string().max(128),
  address: addressSchema,
  config: configSchema.optional(),
});

export type CreateAgencyDto = z.infer<typeof agencySchema>;

export type Agency = CreateAgencyDto & { id: number };
