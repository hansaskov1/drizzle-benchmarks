import { prismaDB } from "./db-connections/prisma-connection";

import { createElysiaServer } from "./frameworks/elysia-server";

const app = createElysiaServer(prismaDB);

app.listen(3000);