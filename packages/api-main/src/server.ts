import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth";
import { boardRoutes } from "./routes/board";

const server = fastify({ logger: true });

// Allow CORS from our frontend
server.register(cors, {
  origin: "http://localhost:5173",
});

server.register(jwt, {
  secret: "your-secret-key",
});

// Phase 0: Health check
server.get("/health", async (request, reply) => {
  return { hello: "world" };
});

// Public routes (no auth required)
// Mount auth routes under /auth -> /auth/register, /auth/login
server.register(authRoutes, { prefix: "/auth" });

// Protected routes (require authentication)
// Mount board routes under /boards so they don't shadow other endpoints
server.register(boardRoutes, { prefix: "/boards" });

const start = async () => {
  try {
    // Must listen on 0.0.0.0 inside Docker
    await server.listen({ port: 8000, host: "0.0.0.0" });
    server.log.info("Server listening on port 8000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
