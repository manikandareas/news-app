import type { Config } from "drizzle-kit";

export default {
    schema: "./lib/db/schema.ts",
    out: "./drizzle",
    driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
    dbCredentials: {
        connectionString: process.env.DRIZZLE_DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
} satisfies Config;
