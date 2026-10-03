import { PrismaClient } from "../generated/prisma";

import { PrismaPg } from "@prisma/adapter-pg";

import "dotenv/config";

import { env } from "../env";

const connectionString = `${process.env.DATABASE_URL}`;

const schema = new URL(connectionString).searchParams.get("schema") ?? "public";

const adapter = new PrismaPg(
  {
    connectionString,
    options: `-c search_path="${schema}"`,
  },
  { schema },
);

const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});

export { prisma };
