import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../db/db.module';
import { Pool } from 'pg';
import { RecurringEvent } from './events.schema';

// TODO: move to separate file
@Injectable() // how does this map into event
export class RecurringEventService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  create(recurringEvent: RecurringEvent) {}

  update(recurringEvent: RecurringEvent) {}
}

@Injectable()
export class EventsService {}
