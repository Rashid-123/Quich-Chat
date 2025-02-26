const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectKafka } = require("./config/kafka");
const redisClient = require("./config/redis");
const initializeSocket = require("./config/ioconnection");

// Import Kafka Consumers
const startIndividualMessageConsumer = require("./consumers/individualMessageConsumer");
const startGroupMessageConsumer = require("./consumers/groupMessageConsumer");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const groupRoutes = require("./routes/groupRoutes");

const searchRoutes = require("./routes/searchRoutes")

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/search", searchRoutes)

// Initialize Socket.io
initializeSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
      console.log(`🚀 Server running on port ${PORT}`);

      // Connect to Redis
      await redisClient.connect();
      console.log("✅ Redis Connected");

      // Connect to Kafka
      await connectKafka();

      // Start Kafka Consumers
      startIndividualMessageConsumer();
      startGroupMessageConsumer();
});
