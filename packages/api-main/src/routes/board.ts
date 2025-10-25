import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import prisma from "../db";
import { authHook } from "../middleware/auth";

// Define what a "user" looks like after the authHook runs
// This helps with TypeScript type safety
interface IAuthdUser {
  id: string;
  email: string;
  iat: number;
}

export async function boardRoutes(server: FastifyInstance) {
  // This 'onRequest' hook protects *all* routes defined in this file.
  // No one can access these routes without a valid JWT token.
  server.addHook("onRequest", authHook);

  // 1. CREATE A NEW BOARD
  server.post(
    "/",
    async (
      request: FastifyRequest<{ Body: { name: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const { name } = request.body;
        const user = request.user as IAuthdUser; // Get user from authHook

        const newBoard = await prisma.board.create({
          data: {
            name,
            ownerId: user.id,
            boardData: {}, // Start with empty board data
          },
        });
        return reply.status(201).send(newBoard);
      } catch (e) {
        console.error(e);
        reply.status(500).send({ message: "Error creating board" });
      }
    }
  );

  // 2. GET ALL BOARDS FOR THE LOGGED-IN USER
  server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = request.user as IAuthdUser;
      const boards = await prisma.board.findMany({
        where: { ownerId: user.id },
        orderBy: { createdAt: "desc" },
      });
      return reply.send(boards);
    } catch (e) {
      console.error(e);
      reply.status(500).send({ message: "Error fetching boards" });
    }
  });

  // 3. GET A SINGLE BOARD BY ID
  server.get(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const user = request.user as IAuthdUser;
        const { id } = request.params;

        const board = await prisma.board.findFirst({
          where: { id, ownerId: user.id }, // Ensures user owns this board
        });

        if (!board) {
          return reply
            .status(404)
            .send({ message: "Board not found or unauthorized" });
        }
        return reply.send(board);
      } catch (e) {
        console.error(e);
        reply.status(500).send({ message: "Error fetching board" });
      }
    }
  );

  // 4. SAVE (UPDATE) A BOARD'S DATA
  server.put(
    "/:id/save",
    async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: { boardData: any };
      }>,
      reply: FastifyReply
    ) => {
      try {
        const user = request.user as IAuthdUser;
        const { id } = request.params;
        const { boardData } = request.body;

        // First, verify the user owns this board
        const existingBoard = await prisma.board.findFirst({
          where: { id, ownerId: user.id },
        });

        if (!existingBoard) {
          return reply
            .status(404)
            .send({ message: "Board not found or unauthorized" });
        }

        // Now update it
        const updatedBoard = await prisma.board.update({
          where: { id },
          data: { boardData },
        });

        return reply.send(updatedBoard);
      } catch (e) {
        console.error(e);
        reply.status(500).send({ message: "Error saving board" });
      }
    }
  );

  // 5. DELETE A BOARD
  server.delete(
    "/:id",
    async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply
    ) => {
      try {
        const user = request.user as IAuthdUser;
        const { id } = request.params;

        // Verify ownership before deleting
        const existingBoard = await prisma.board.findFirst({
          where: { id, ownerId: user.id },
        });

        if (!existingBoard) {
          return reply
            .status(404)
            .send({ message: "Board not found or unauthorized" });
        }

        // Delete the board
        await prisma.board.delete({
          where: { id },
        });

        return reply.status(204).send(); // 204 No Content is standard for delete
      } catch (e) {
        console.error(e);
        reply.status(500).send({ message: "Error deleting board" });
      }
    }
  );
}
