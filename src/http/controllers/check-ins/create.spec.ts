import request from "supertest";
import { app } from "../../../app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { createAndAuthenticateUser } from "@/use-cases/create-and-authenticate-user";
import { title } from "node:process";
import { prisma } from "@/lib/prisma";

describe("create check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -23.6447814,
        longitude: -46.6424028,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -23.6447814,
        longitude: -46.6424028,
      });

    

    expect(response.statusCode).toEqual(201);
  });
});
