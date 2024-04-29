import { Injectable } from '@nestjs/common';
import { client } from '../db/client';
import {
  type Agency,
  type AgencyCreate,
  type AgencyUpdate,
  agencyUpdateSchema,
  agencyCreateSchema,
} from './agencies.schema';

type Query<T> = (c: typeof client) => Promise<T>;

async function transaction<T>(query: Query<T>): Promise<T> {
  try {
    await client.query('BEGIN');
    const res = await query(client);
    await client.query('COMMIT');
    return res;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    // TODO: check if this finally does not mess up with return in try block
    await client.end();
  }
}

transaction(async (client) => {
  await client.query('SELECT * FROM smth');
  await client.query('UPDATE ...');
  await client.query('UPDATE ...');
});

@Injectable()
export class AgenciesService {
  async create(agency: AgencyCreate): Promise<Agency> {
    agency = agencyCreateSchema.parse(agency);
    const address = agency.address;
    const res = await client.query<Agency>({
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
    const res = await client.query<Agency>({
      text: 'SELECT * from agencies',
    });

    return res.rows;
  }

  async findOne(id: number): Promise<Agency> {
    const res = await client.query<Agency>({
      text: 'SELECT * FROM agencies WHERE id = $1',
      values: [id],
    });
    // TODO: what if result was not found
    return res.rows[0];
  }

  async update(agency: AgencyUpdate): Promise<Agency> {
    agency = agencyUpdateSchema.parse(agency);

    const res = await client.query<Agency>({
      text: 'SELECT * FROM ... RETURNING *',
      values: [agency.id],
    });

    return res.rows[0];
  }

  async softDelete(id: number): Promise<void> {
    client.query({
      text: 'UPDATE agencies SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    });
  }

  async hardDelete(id: number): Promise<void> {
    client.query({
      text: 'DELETE FROM agencies WHERE id =$1',
      values: [id],
    });
  }
}
