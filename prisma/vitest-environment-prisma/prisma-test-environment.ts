import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

// import type { Environment } from "vitest/environments";
// import { prisma } from "../../src/lib/prisma";
import type { Environment } from "vitest/runtime";

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("please provide a DATABASE_URL env varaible");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma",
  viteEnvironment: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseUrl = generateDataBaseUrl(schema);


    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma db push");

    return {
      async teardown() {
        const { prisma } = await import("../../src/lib/prisma.js");

        
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
};

