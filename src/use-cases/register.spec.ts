import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { compare } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Jana",
      email: "jana@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Jana",
      email: "jana@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register with same email twice", async () => {
    const email = "jana@example.com";

    await sut.execute({
      name: "Jana",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Jana",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
