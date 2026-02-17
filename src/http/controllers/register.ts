import z from "zod";
import type { FastifyReply, FastifyRequest } from "fastify";

import { RegisterUserCase } from "../../use-cases/register";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  // SOLID - D - principio da inversão de dependência

  
  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUserCase = new RegisterUserCase(usersRepository);

    await registerUserCase.execute({
      name,
      email,
      password,
    });
  } catch (error) {

    if ( error instanceof UserAlreadyExistsError){
    return reply.status(409).send({message: 'E-mail already exists'});
    }
   throw error
  }


  return reply.status(201).send();
}
