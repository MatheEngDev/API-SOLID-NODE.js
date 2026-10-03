import { FastifyInstance } from "fastify";
import Request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await Request(app.server).post("/users").send({
    name: "Matheus",
    email: "matheus@gmail.com",
    password: "123456",
  });

  const authResponse = await Request(app.server).post("/sessions").send({
    email: "matheus@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return {
     token,

   }
}
