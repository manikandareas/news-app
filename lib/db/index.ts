import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL as string);
const db = drizzle(sql, { schema });

export default db;
