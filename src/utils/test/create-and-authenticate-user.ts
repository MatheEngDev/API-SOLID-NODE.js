import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";
import { randomUUID } from "node:crypto";
export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const email = `matheus-${randomUUID()}@gmail.com`;
  await prisma.user.create({
    data: {
      name: "Matheus juan",
      email,
      passwordHash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",

    },

    
    
  });



  
  const authResponse = await request(app.server)
    .post("/sessions")
    .send({ email, password: "123456" });


    
  const { token } = authResponse.body;
  return { token };
}
