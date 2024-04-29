import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const dbProvider = {
  provide: process.env.PG_CONNECTION_STRING,
  useValue: new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'postgres',
    password: 'admin1234',
    port: 5432,
  }),
};
@Module({ providers: [dbProvider], exports: [dbProvider] })
export class DbModule {}
