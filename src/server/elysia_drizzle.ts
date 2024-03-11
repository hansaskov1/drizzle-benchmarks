import { drizzleDB } from "./db-connections/drizzle-connection";

import { createElysiaServer } from "./frameworks/elysia-server";

const app = createElysiaServer(drizzleDB);

app.listen(3000);