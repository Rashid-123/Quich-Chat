const prisma = require("../config/prisma");

exports.sendFriendRequest = async (req, res) => {
      try {
            const { receiverId } = req.body;
            const senderId = req.user.id;

            // Check if request already exists
            const existingRequest = await prisma.friendRequest.findFirst({
                  where: { senderId, receiverId, status: "pending" }
            });
            if (existingRequest) return res.status(400).json({ message: "Friend request already sent" });

            // Create friend request
            await prisma.friendRequest.create({
                  data: { senderId, receiverId }
            });

            res.status(200).json({ message: "Friend request sent successfully" });
      } catch (error) {
            res.status(500).json({ message: "Error sending friend request", error: error.message });
      }
};

exports.acceptFriendRequest = async (req, res) => {
      try {
            const { requestId } = req.body;
            const userId = req.user.id;

            // Find the request
            const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
            if (!request) return res.status(404).json({ message: "Friend request not found" });

            if (request.receiverId !== userId)
                  return res.status(403).json({ message: "Unauthorized action" });

            // Update request status
            await prisma.friendRequest.update({
                  where: { id: requestId },
                  data: { status: "accepted" }
            });

            // Add users as friends
            await prisma.friend.createMany({
                  data: [
                        { userId: request.senderId, friendId: request.receiverId },
                        { userId: request.receiverId, friendId: request.senderId }
                  ]
            });

            res.status(200).json({ message: "Friend request accepted" });
      } catch (error) {
            res.status(500).json({ message: "Error accepting friend request", error: error.message });
      }
};

exports.getFriends = async (req, res) => {
      try {
            const { userId } = req.params;

            const friends = await prisma.friend.findMany({
                  where: { userId },
                  include: { friend: true }
            });

            res.status(200).json({ friends });
      } catch (error) {
            res.status(500).json({ message: "Error fetching friends", error: error.message });
      }
};
