import { FastifyReply, FastifyRequest } from "fastify";

export async function VerifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
        console.error("ERRO NA VALIDAÇÃO DO JWT:", err);

    return reply.status(401).send({ message: "unauthorized." });
  }
}
