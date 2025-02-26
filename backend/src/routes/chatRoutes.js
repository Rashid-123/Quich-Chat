const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
      sendMessage,
      getMessages,
      getUserConversations,
      deleteMessage,
      editMessage,
} = require("../controllers/chatController");

const router = express.Router();

// ✅ **Send a message** (Alternative to WebSockets)
router.post("/send", verifyToken, sendMessage);

// ✅ **Get all messages between two users**
router.get("/:userId/:friendId", verifyToken, getMessages);

// ✅ **Get all user conversations (last messages from different chats)**
router.get("/conversations/:userId", verifyToken, getUserConversations);



module.exports = router;
