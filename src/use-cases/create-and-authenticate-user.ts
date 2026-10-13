import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance, p0: boolean) {
  await request(app.server).post("/users").send({
    name: "Matheus",
    email: "matheus@gmail.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "matheus@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
    token,
  }
}
