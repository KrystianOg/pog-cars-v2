import { Inject, Injectable } from '@nestjs/common';
import { Role, CreateRoleDto } from './roles.schema';
import { PG_CONNECTION } from '../db/db.module';
import { Pool } from 'pg';
import { transaction } from '../db/utils/transaction';

@Injectable()
export class RolesService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  async findAll(): Promise<Role[]> {
    const res = await this.conn.query<Role>({
      text: 'SELECT * FROM roles',
    });

    return res.rows;
  }

  /**
   * Roles are created per agency
   */
  async create(role: CreateRoleDto): Promise<Role> {
    await transaction(this.conn, async (client) => {
      const smth1 = await client.query<Role>({
        text: 'INSERT INTO roles (agency_id, name, description, created_by) values ($1, $2, $3, $4) returning *',
        // TODO: change the '1' to current_user.id
        values: [role.agency_id, role.name, role.description, 1],
      });

      const insertedRole = smth1.rows[0];

      await client.query({
        text: 'INSERT INTO roles_permissions () values ()',
        values: [insertedRole.id],
      });
    });
    const res = await this.conn.query<Role>({
      text: 'INSERT INTO roles',
      values: [role.name],
    });

    return res.rows[0];
  }

  async update(id: number, role: CreateRoleDto): Promise<Role> {
    const res = await this.conn.query<Role>({
      text: `UPDATE roles SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
      WHERE id = $3`,
      values: [role.name, role.description, id],
    });

    return res.rows[0];
  }

  async softDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'UPDATE roles SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    });
  }

  async hardDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'DELETE FROM roles WHERE id = $1',
      values: [id],
    });
  }
}
