const prisma = require("../config/prisma");
const { sendGroupMessageToKafka } = require("../producers/groupMessageProducer");

// Create a Group
exports.createGroup = async (req, res) => {
      try {
            const { ownerId, name } = req.body;

            const group = await prisma.group.create({
                  data: { ownerId, name },
            });

            res.json({ message: "Group created", group });
      } catch (error) {
            res.status(500).json({ error: "Error creating group" });
      }
};

// Add Members to a Group
exports.addMembers = async (req, res) => {
      try {
            const { groupId, userIds } = req.body;

            await prisma.groupMember.createMany({
                  data: userIds.map((userId) => ({ groupId, userId })),
            });

            res.json({ message: "Members added" });
      } catch (error) {
            res.status(500).json({ error: "Error adding members" });
      }
};

// Remove a Member from a Group
exports.removeMember = async (req, res) => {
      try {
            const { groupId, userId } = req.body;

            await prisma.groupMember.deleteMany({ where: { groupId, userId } });

            res.json({ message: "Member removed" });
      } catch (error) {
            res.status(500).json({ error: "Error removing member" });
      }
};

// Send a Group Message (Kafka Integration)
exports.sendGroupMessage = async (req, res) => {
      try {
            const { senderId, groupId, content } = req.body;

            // Send message to Kafka via helper function
            await sendGroupMessageToKafka("group-messages", { senderId, groupId, content });

            res.json({ message: "Message queued for delivery" });
      } catch (error) {
            res.status(500).json({ error: "Error sending message" });
      }
};

// Get Group Messages (Without Caching)
exports.getGroupMessages = async (req, res) => {
      try {
            const { groupId } = req.params;

            // Fetch from database
            const messages = await prisma.message.findMany({
                  where: { groupId },
                  orderBy: { createdAt: "asc" },
            });

            res.json(messages);
      } catch (error) {
            res.status(500).json({ error: "Error retrieving messages" });
      }
};

// Delete a Group Message
exports.deleteGroupMessage = async (req, res) => {
      try {
            const { messageId } = req.params;

            await prisma.message.delete({ where: { id: messageId } });

            res.json({ message: "Message deleted" });
      } catch (error) {
            res.status(500).json({ error: "Error deleting message" });
      }
};

// Get User Groups (Without Caching)
exports.getUserGroups = async (req, res) => {
      try {
            const { userId } = req.params;

            // Fetch from database
            const groups = await prisma.groupMember.findMany({
                  where: { userId },
                  include: { group: true },
            });

            res.json(groups);
      } catch (error) {
            res.status(500).json({ error: "Error retrieving groups" });
      }
};
