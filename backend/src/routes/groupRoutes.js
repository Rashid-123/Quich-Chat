const express = require("express");
const { verifyToken } = require("../middleware/auth");
const {
      createGroup,
      addMembers,
      removeMember,
      sendGroupMessage,
      getGroupMessages,
      deleteGroupMessage,
      getUserGroups,
} = require("../controllers/groupController");

const router = express.Router();

// ✅ **Create a new group**
router.post("/create", verifyToken, createGroup);

// ✅ **Add members to a group**
router.post("/add-members", verifyToken, addMembers);

// ✅ **Remove a member from a group**
router.delete("/remove-member", verifyToken, removeMember);

// ✅ **Send a message in a group chat**
router.post("/send-message", verifyToken, sendGroupMessage);

// ✅ **Get all messages in a group**
router.get("/messages/:groupId", verifyToken, getGroupMessages);


// ✅ **Get all groups a user is part of**
router.get("/user-groups/:userId", verifyToken, getUserGroups);

module.exports = router;
