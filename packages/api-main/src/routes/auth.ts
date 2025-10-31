import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import prisma from "../db";
import bcrypt from "bcrypt";

// Define the shape of the request body for auth routes
interface IAuthBody {
  email: string;
  password: string;
}

type RegisterBody = IAuthBody & {
  firstName: string;
  lastName: string;
};

export async function authRoutes(server: FastifyInstance) {
  server.post(
    "/register",
    async (
      request: FastifyRequest<{ Body: RegisterBody }>,
      reply: FastifyReply
    ) => {
      const { firstName, lastName, email, password } = request.body;

      try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return reply.status(409).send({ message: "Email already in use." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create the new user
        const user = await prisma.user.create({
          data: {
            firstName,
            lastName,
            email,
            passwordHash,
          },
        });

        // Don't send the password hash back
        return reply.status(201).send({ id: user.id, email: user.email });
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );

  server.post(
    "/login",
    async (
      request: FastifyRequest<{ Body: IAuthBody }>,
      reply: FastifyReply
    ) => {
      const { email, password } = request.body;

      try {
        // Find the user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return reply
            .status(401)
            .send({ message: "Invalid email or password" });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          return reply
            .status(401)
            .send({ message: "Invalid email or password" });
        }

        // User is valid, create a JWT token
        // The 'user' object from the DB is added to the token payload
        const token = server.jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          { expiresIn: "1h" }
        );

        return reply.send({
          token,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
}
