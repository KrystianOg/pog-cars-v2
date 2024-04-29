import { Client } from 'pg';

console.info('pg string', process.env.PG_CONNECTION_STRING);
export const client = new Client({
  connectionString: 'postgresql://admin:admin1234@localhost:5432/postgres',
  query_timeout: 10000,
});
