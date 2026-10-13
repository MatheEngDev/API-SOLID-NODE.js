import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import Request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: "Matheus juan",
      email: "matheus@gmail.com",
      passwordHash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await Request(app.server).post("/sessions").send({
    email: "matheus@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
