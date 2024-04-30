import { Inject, Injectable } from '@nestjs/common';
import { Role, RoleCreate, roleCreateSchema } from './roles.schema';
import { PG_CONNECTION } from 'src/db/db.module';
import { Pool } from 'pg';

@Injectable()
export class RolesService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  /**
   * Roles are created per agency
   */
  async createRole(role: RoleCreate) {
    role = roleCreateSchema.parse(role);

    const res = await this.conn.query<Role>({
      text: 'INSERT INTO roles',
      values: [role.name],
    });

    return res.rows;
  }
}
