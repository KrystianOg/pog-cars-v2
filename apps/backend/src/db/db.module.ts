import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';

export const PG_CONNECTION = 'PG_CONNECTION';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: pool,
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
