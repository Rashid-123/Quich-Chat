const { Server } = require("socket.io");
const redisClient = require("./redis");
const axios = require("axios");

const initializeSocket = (server) => {
      const io = new Server(server, {
            cors: {
                  origin: process.env.CLIENT_URL || "*",
                  methods: ["GET", "POST"],
            },
      });

      io.on("connection", async (socket) => {
            console.log(`⚡ User connected: ${socket.id}`);

            // Extract userId from handshake query
            const { userId } = socket.handshake.query;

            if (userId) {
                  // Store user status in Redis
                  await redisClient.set(`user:${userId}:online`, "true");
                  await redisClient.sAdd("onlineUsers", userId);
                  await redisClient.set(`socket:${userId}`, socket.id); // Map userId to socketId
            }

            // ✅ Handle individual messages
            socket.on("sendMessage", async (messageData, callback) => {
                  console.log("📩 Private message received:", messageData);

                  const { senderId, receiverId, content } = messageData;

                  // Fetch receiver's socket ID from Redis
                  const receiverSocketId = await redisClient.get(`socket:${receiverId}`);

                  if (receiverSocketId) {
                        // ✅ Deliver message if receiver is online
                        io.to(receiverSocketId).emit("receiveMessage", messageData);
                        console.log(`✅ Delivered message to user ${receiverId}`);
                  } else {
                        console.log(`⚠️ User ${receiverId} is offline, storing in DB`);
                  }

                  // ✅ Save message in MongoDB via Kafka
                  axios.post(`${process.env.BACKEND_URL}/api/chat/sendMessage`, messageData)
                        .then(() => console.log("✅ Message stored in DB via Kafka"))
                        .catch((err) => console.error("❌ Error storing message:", err));

                  // ✅ Acknowledge sender
                  callback({ status: "delivered" });
            });

            // ✅ Handle group messages
            socket.on("sendGroupMessage", async (messageData, callback) => {
                  console.log("📩 Group message received:", messageData);

                  const { groupId, senderId, message } = messageData;

                  // ✅ Emit to all users in the group
                  io.to(groupId).emit("receiveGroupMessage", messageData);
                  console.log(`✅ Broadcasted message in group ${groupId}`);

                  // ✅ Save message in MongoDB via Kafka
                  axios.post(`${process.env.BACKEND_URL}/api/group/sendMessage`, messageData)
                        .then(() => console.log("✅ Group message stored in DB via Kafka"))
                        .catch((err) => console.error("❌ Error storing group message:", err));

                  // ✅ Acknowledge sender
                  callback({ status: "delivered" });
            });

            // ✅ Handle joining a group
            socket.on("joinGroup", (groupId) => {
                  socket.join(groupId);
                  console.log(`👥 User ${userId} joined group ${groupId}`);
            });

            // ✅ Handle leaving a group
            socket.on("leaveGroup", (groupId) => {
                  socket.leave(groupId);
                  console.log(`🚪 User ${userId} left group ${groupId}`);
            });

            // ✅ Handle user disconnection
            socket.on("disconnect", async () => {
                  console.log(`❌ User disconnected: ${socket.id}`);

                  if (userId) {
                        await redisClient.del(`user:${userId}:online`);
                        await redisClient.sRem("onlineUsers", userId);
                        await redisClient.del(`socket:${userId}`);
                  }
            });
      });
};

module.exports = initializeSocket;
