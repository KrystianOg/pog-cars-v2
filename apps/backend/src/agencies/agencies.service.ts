import { Inject, Injectable } from '@nestjs/common';
import type { Agency, AgencyCreate, AgencyUpdate } from './agencies.schema';
import { PG_CONNECTION } from 'src/db/db.module';
import { Pool } from 'pg';

@Injectable()
export class AgenciesService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  async create(agency: AgencyCreate): Promise<Agency> {
    const address = agency.address;
    const res = await this.conn.query<Agency>({
      text: `WITH inserted_address AS (
          INSERT INTO addresses (street, city, state, postal_code, country)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id
        ) INSERT INTO agencies (name, address_id)
          SELECT $6, id FROM inserted_address
          RETURNING id;`,
      values: [
        address.street,
        address.city,
        address.state,
        address.postal_code,
        address.country,
        agency.name,
      ],
    });

    return res.rows[0];
  }

  async findAll(): Promise<Agency[]> {
    const res = await this.conn.query<Agency>({
      text: 'SELECT * from agencies',
    });

    return res.rows;
  }

  async findOne(id: number): Promise<Agency> {
    const res = await this.conn.query<Agency>({
      text: 'SELECT * FROM agencies WHERE id = $1',
      values: [id],
    });
    // TODO: what if result was not found
    return res.rows[0];
  }

  async update(agency: AgencyUpdate): Promise<Agency> {
    const res = await this.conn.query<Agency>({
      text: `UPDATE agencies 
          name = COALESCE($1, name)`,
      values: [agency.name],
    });

    return res.rows[0];
  }

  async softDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'UPDATE agencies SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1',
      values: [id],
    });
  }

  async hardDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'DELETE FROM agencies WHERE id = $1',
      values: [id],
    });
  }
}
