import { Injectable } from '@nestjs/common';
import { client } from '../db/client';
import type { Agency, AgencyCreate, AgencyUpdate } from './agencies.schema';

@Injectable()
export class AgenciesService {
  async create(agency: AgencyCreate): Promise<Agency> {
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
    const res = await client.query<Agency>({
      text: `UPDATE agencies 
          name = COALESCE($1, name)`,
      values: [agency.name],
    });

    return res.rows[0];
  }

  async softDelete(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  async hardDelete(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
}
