import { Pool, PoolClient } from 'pg';

export const transaction = async <T>(
  pool: Pool,
  cb: (client: PoolClient) => T | Promise<T>,
): Promise<NoInfer<T>> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const res = await cb(client);
    await client.query('COMMIT');
    return res;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};
