import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.POSTGRES_URL;
const pool = new Pool({
  connectionString: connectionString,
});

export const db = drizzle({
  client: pool,
  logger: process.env.NODE_ENV === "development",
});
