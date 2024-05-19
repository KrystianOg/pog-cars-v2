import { RRule } from 'rrule';
import { z } from 'zod';

const zRRule = z.string().refine((rruleStr) => RRule.parseString(rruleStr), {
  message: 'Invalid rule',
});

const eventSchema = z.object({});

export type Event = z.infer<typeof eventSchema>;

const recurringEventSchema = z.object({
  rrule: zRRule,
  exrule: zRRule.array().optional(),
  exdate: z.coerce.date().optional(),
});

export type RecurringEvent = z.infer<typeof recurringEventSchema> & {
  id: number;
};
