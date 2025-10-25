import { FastifyRequest, FastifyReply } from "fastify";

/**
 * A Fastify "hook" to protect routes.
 * It verifies the JWT from the Authorization header.
 * If valid, it attaches the user payload to `request.user`.
 * If invalid, it stops the request and sends a 401.
 */
export async function authHook(request: FastifyRequest, reply: FastifyReply) {
  try {
    // This `request.jwtVerify()` function comes from the @fastify/jwt plugin
    // we registered in server.ts.
    // It automatically reads the "Authorization: Bearer ..." header.
    await request.jwtVerify();

    // If verification is successful, `request.user` is now populated
    // with the payload we signed in the login route
    // (e.g., { id: '...', email: '...', iat: ... })
  } catch (err) {
    // If the token is missing, expired, or otherwise invalid
    reply
      .status(401)
      .send({ message: "Unauthorized. Invalid or missing token." });
  }
}
