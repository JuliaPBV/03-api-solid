import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jet";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", create);
}
