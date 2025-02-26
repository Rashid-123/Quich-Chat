import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Search Users API
const searchUsers = async (req, res) => {
      try {
            const { query } = req.query; // Get search input from frontend

            if (!query) {
                  return res.status(400).json({ error: "Search query is required" });
            }

            const users = await prisma.user.findMany({
                  where: {
                        OR: [
                              { username: { contains: query, mode: "insensitive" } }, // Case-insensitive search
                              { email: { contains: query, mode: "insensitive" } },
                        ],
                  },
                  select: {
                        id: true,
                        username: true,
                        email: true,
                  },
            });

            res.json(users);
      } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
      }
};

export { searchUsers };
