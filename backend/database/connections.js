import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

export const pool = new Pool({
  host: env.host,
  port: Number(env.port),
  database: env.database,
  user: env.user,
  password: env.password,
  allowExitOnIdle: true,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
});

const verifyConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

verifyConnection();

const { rows } = await pool.query(`
  SELECT current_user, current_database() AS db, inet_server_port() AS port, current_setting('search_path') AS search_path
`);
console.log('DB session info (from Node):', rows[0]);

export default pool;
