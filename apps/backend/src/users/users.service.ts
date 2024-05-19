import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, userCreateSchema, userUpdateSchema } from './users.schema';
import type { UserCreate, UserUpdate } from './users.schema';
import * as bcrypt from 'bcrypt';
import { PG_CONNECTION } from '../db/db.module';
import { Pool, DatabaseError } from 'pg';

enum Code {
  USER_EXISTS = 1,
  INVALID_CREDENTIALS = 2,
}

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  async findOne(email: string | number): Promise<User> {
    // TODO: make sure that this | number doesn't break anything
    const res = await this.conn.query<User>({
      text: 'SELECT * FROM users WHERE email = $1;',
      values: [email],
    });

    return res.rows[0];
  }

  async findOneById(id: number): Promise<User> {
    const res = await this.conn.query<User>({
      text: 'SELECT * FROM users WHERE id = $1;',
      values: [id],
    });

    if (res.rows.length === 0) {
      throw new NotFoundException();
    }

    return res.rows[0];
  }

  async findAll(): Promise<User[]> {
    const res = await this.conn.query<User>({
      text: 'SELECT * FROM users;', // TODO: additional where clause required for safery
      values: [],
    });

    return res.rows;
  }

  async create(user: UserCreate): Promise<User> {
    user = userCreateSchema.parse(user);
    const passwordHash = bcrypt.hashSync(user.password, 11);
    try {
      const res = await this.conn.query<User>({
        text: 'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *;',
        values: [user.email, passwordHash, user.username],
      });

      return res.rows[0];
    } catch (error) {
      if (error instanceof DatabaseError) {
        if (error.constraint === 'users_email_key')
          throw new HttpException(
            'User already exists',
            HttpStatus.BAD_REQUEST,
            { cause: Code.USER_EXISTS },
          );
      }
      throw error;
    }
  }

  async update(user: UserUpdate): Promise<User> {
    user = userUpdateSchema.parse(user);

    const res = await this.conn.query<User>({
      text: 'UPDATE users SET ... WHERE id = $1 RETURNING *',
      values: [user.id],
    });
    return res.rows[0];
  }

  async softDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'UPDATE users SET deleted_at = NOW() WHERE id = $1',
      values: [id],
    });
  }

  async hardDelete(id: number): Promise<void> {
    await this.conn.query({
      text: 'DELETE FROM users WHERE id = $1',
      values: [id],
    });
  }
}
