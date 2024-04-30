import { Pool } from 'pg';

console.info('pg string', process.env.PG_CONNECTION_STRING);
export const client = new Pool({
  connectionString: 'postgresql://admin:admin1234@localhost:5432/postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
