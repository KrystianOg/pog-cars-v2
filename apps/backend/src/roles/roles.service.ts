import { Inject, Injectable } from '@nestjs/common';
import { Role, CreateRoleDto} from './roles.schema';
import { PG_CONNECTION } from 'src/db/db.module';
import { Pool } from 'pg';
import { transaction } from 'src/db/utils/transaction';

@Injectable()
export class RolesService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  /**
   * Roles are created per agency
   */
  async create(role: CreateRoleDto) {
    const smth  =transaction(this.conn, async (client) => {
      const smth1 = await client.query<Role>({
        text: "INSERT INTO roles (agency_id, name, description, created_by) values ($1, $2, $3, $4) returning *",
        // TODO: change the '1' to current_user.id
        values: [role.agency_id, role.name, role.description, 1]
      })

      const insertedRole = smth1.rows[0]

      const rolesPermissions = await client.query({
        text: "INSERT INTO roles_permissions () values () returning *",
        values: []
      })
    })
    const res = await this.conn.query<Role>({
      text: 'INSERT INTO roles',
      values: [role.name],
    });

    return res.rows;
  }

  async update(id: number, role: CreateRoleDto) {
    const res = await this.conn.query<Role>({
      text: "UPDATE ... WHERE id = $1",
      values: [id, ]
    })

    return res.rows
  }

  async softDelete(id: number) {
    await this.conn.query({
      text: 'UPDATE roles SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    });
  }

  async hardDelete(id: number) {

  }
}
