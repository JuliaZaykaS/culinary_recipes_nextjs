import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
    // schema: "prisma/schema.prisma",
    migrations: {
        path: 'prisma/migrations',
    },
    engine: 'classic',
    datasource: {
        url: env('DATABASE_URL'),
    },
    schema: path.join('prisma', 'schema.prisma'),
});
