const redisClient = require("../config/redis");
const kafka = require("../config/kafka");
const { sendIndividualMessageToKafka } = require("../producers/individualMessageProducer");


// ✅ **Send a message** (Handles online & offline users)
const sendMessage = async (req, res) => {
      try {
            const { senderId, receiverId, message } = req.body;
            const messageData = { senderId, receiverId, message, timestamp: Date.now() };

            // Send message to Kafka for persistence
            await sendIndividualMessageToKafka("individual-messages", messageData);

            res.status(200).json({ success: true, message: "Message sent." });
      } catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
      }
};

// ✅ **Get messages between two users**
const getMessages = async (req, res) => {
      try {
            const { userId, friendId } = req.params;

            // ✅ Correct: Fetch messages from the database, not Kafka
            const messages = await prisma.message.findMany({
                  where: {
                        OR: [
                              { senderId: userId, receiverId: friendId },
                              { senderId: friendId, receiverId: userId }
                        ]
                  },
                  orderBy: { createdAt: "asc" } // Sort messages by time
            });

            res.status(200).json({ success: true, messages });
      } catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
      }
};

// ✅ **Get all user conversations (last message per chat)**
const getUserConversations = async (req, res) => {
      try {
            const { userId } = req.params;

            // ✅ Fetch distinct conversations where the user is either sender or receiver
            const conversations = await prisma.message.findMany({
                  where: {
                        OR: [
                              { senderId: userId },
                              { receiverId: userId }
                        ]
                  },
                  distinct: ["senderId", "receiverId"], // Ensure unique conversations
                  orderBy: { createdAt: "desc" } // Sort by latest message
            });

            res.status(200).json({ success: true, conversations });
      } catch (error) {
            console.error("Error fetching conversations:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
      }
};


module.exports = { sendMessage, getMessages, getUserConversations };
