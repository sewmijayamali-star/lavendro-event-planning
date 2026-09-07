const express = require("express");

const router = express.Router();

const {
  protect,
  supportOnly,
} = require("../middleware/authMiddleware");

const {
  createOrGetConversation,
  getMyConversation,
  getSupportConversations,
  assignConversation,
  sendMessage,
  getConversationMessages,  
} = require("../controllers/supportController");

// Customer - create or get their support conversation
router.post(
  "/conversations",
  protect,
  createOrGetConversation
);

// Customer - get their own conversation
router.get(
  "/conversations/me",
  protect,
  getMyConversation
);

// Support staff - get all open conversations
router.get(
  "/conversations",
  protect,
  supportOnly,
  getSupportConversations
);

router.post(
  "/conversations/:id/assign",
  protect,
  supportOnly,
  assignConversation 
);

// Customer or Support - send a message
router.post(
  "/conversations/:id/messages",
  protect,
  sendMessage
);

// Get all messages in a conversation
router.get(
  "/conversations/:id/messages",
  protect,
  getConversationMessages
);


module.exports = router;

