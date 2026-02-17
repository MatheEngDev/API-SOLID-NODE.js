import { expect, describe, it } from "vitest";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    const { user } = await registerUseCase.execute({
      name: "matheus",
      email: "mathe1@gmail.com",
      password: "123456",
    });

    const isPassowrdCorrectlyHashed = await compare(
      "123456",
      user.passwordHash,
    );

    expect(isPassowrdCorrectlyHashed).toBe(true);
  });
});
