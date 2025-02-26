const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { sendFriendRequest, acceptFriendRequest, getFriends } = require("../controllers/friendController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// ✅ **User registration**
router.post("/register", register);

// ✅ **User login**
router.post("/login", login);

// ✅ **User logout**
router.post("/logout", verifyToken, logout);

// ✅ **Send a friend request**
router.post("/friend-request/send", verifyToken, sendFriendRequest);

// ✅ **Accept a friend request**
router.post("/friend-request/accept", verifyToken, acceptFriendRequest);

// ✅ **Get all friends of a user**
router.get("/friends/:userId", verifyToken, getFriends);

module.exports = router;
