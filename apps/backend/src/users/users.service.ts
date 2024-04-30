import { Inject, Injectable } from '@nestjs/common';
import { users as mockUsers } from './users.mocks';
import { User, userCreateSchema } from './users.schema';
import type { UserCreate } from './users.schema';
import * as bcrypt from 'bcrypt';
import { PG_CONNECTION } from 'src/db/db.module';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  private readonly users = mockUsers;

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(user: UserCreate): Promise<User> {
    user = userCreateSchema.parse(user);
    const passwordHash = bcrypt.hashSync(user.password, 11);

    const res = await this.conn.query<User>({
      text: 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *;',
      values: [user.email, passwordHash, user.username],
    });

    return res.rows[0];
  }
}
