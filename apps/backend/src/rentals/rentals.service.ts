import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/db/db.module';
import { Rental } from './rentals.schema';

@Injectable()
export class RentalsService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  async findAll() {
    const res = await this.conn.query<Rental>({
      text: 'SELECT * FROM rentals',
    });

    return res.rows;
  }

  async findOne(id: number) {
    const res = await this.conn.query<Rental>({
      text: 'SELECT * FROM rentals where id = $1',
      values: [id],
    });

    return res.rows[0];
  }
}
