import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connectionUri = process.env.DATABASE_URL || "mysql://root:password@localhost:3306/belajar_vibe_code";

// Create connection pool for MySQL
export const pool = mysql.createPool(connectionUri);

// Initialize Drizzle ORM instance with schema
export const db = drizzle(pool, { schema, mode: "default" });

export * from "./schema";
