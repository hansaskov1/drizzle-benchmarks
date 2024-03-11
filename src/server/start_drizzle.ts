import { serve } from "@hono/node-server";
import { drizzleDB } from "./db-connections/drizzle-connection";
import { createHonoServer } from "./frameworks/hono-server";

const app = createHonoServer(drizzleDB);

serve({
  fetch: app.fetch,
  port: 3000,
});
