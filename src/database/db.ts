import { Pool, QueryResult } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
})

export const query = async (text: string, params?: any[]): Promise<any[]> => {
  const res: QueryResult = await pool.query(text, params);
  return res.rows;
}