import { Injectable } from '@nestjs/common';
import { users as mockUsers } from './users.mocks';
import { User, userCreateSchema } from './users.schema';
import { client } from '../db/client';
import type { UserCreate } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users = mockUsers;

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(user: UserCreate): Promise<User> {
    user = userCreateSchema.parse(user);
    const passwordHash = bcrypt.hashSync(user.password, 11);

    console.log('PG: ', process.env.PG_CONNECTION_STRING);

    const resTest = await client.query<any>({
      text: 'SELECT * FROM cars;',
    });

    console.log('res test', resTest);
    const res = await client.query<User>({
      text: 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *;',
      values: [user.email, passwordHash, user.username],
    });

    return res.rows[0];
  }
}
