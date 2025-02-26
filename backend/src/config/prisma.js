import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
      datasources: {
            db: {
                  url: process.env.DATABASE_URL, // Using the environment variable
            },
      },
});

export default prisma;
