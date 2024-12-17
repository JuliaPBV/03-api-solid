import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jet";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
}
