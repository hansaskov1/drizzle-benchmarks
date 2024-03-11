import { serve } from "@hono/node-server";
import { createHonoServer } from "./frameworks/hono-server";
import { prismaDB } from "./db-connections/prisma-connection";

const app = createHonoServer(prismaDB);

serve({
  fetch: app.fetch,
  port: 3000,
});
