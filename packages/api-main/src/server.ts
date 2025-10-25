import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

// Allow CORS from our frontend
server.register(cors, {
  origin: "http://localhost:5173",
});

// Phase 0: Health check
server.get("/health", async (request, reply) => {
  return { hello: "world" };
});

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
