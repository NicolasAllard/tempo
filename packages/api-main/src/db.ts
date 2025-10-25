import { PrismaClient } from "@prisma/client";

// This creates a single, global instance of the PrismaClient
// that the rest of your application can import and use.
// This is a standard pattern for using Prisma in a Node.js server.
const prisma = new PrismaClient();

export default prisma;
