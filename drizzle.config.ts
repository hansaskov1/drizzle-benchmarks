import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./src/server/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
