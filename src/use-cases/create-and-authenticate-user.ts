import { FastifyInstance } from "fastify";
import request from "supertest";

import { prisma } from "@/lib/prisma";

interface Options {
  role?: "ADMIN" | "MEMBER";
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  { role = "MEMBER" }: Options = {},
) {
const email = "matheus@gmail.com";
  const registerResponse = await request(app.server).post("/users").send({
    name: "Matheus",
    email,
    password: "123456",
  });

  if (registerResponse.statusCode !== 201) {
    throw new Error(
      `Falha ao cadastrar usuário: ${JSON.stringify(registerResponse.body)}`,
    );
  }

  if (role === "ADMIN") {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        role: "ADMIN",
      },
    });
  }

  const authResponse = await request(app.server).post("/sessions").send({
    email,
    password: "123456",
  });

  if (authResponse.statusCode !== 200) {
    throw new Error(
      `Falha na autenticação: ${JSON.stringify(authResponse.body)}`,
    );
  }

  const { token } = authResponse.body;

  return { token };
}
