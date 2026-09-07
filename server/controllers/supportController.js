const SupportConversation = require("../models/SupportConversation.js.js");
const SupportMessage = require("../models/SupportMessage");

// ==========================================
// CREATE OR GET CUSTOMER CONVERSATION
// ==========================================
exports.createOrGetConversation = async (req, res) => {
  try {
    const customerId = req.user._id;

    // Check whether customer already has an open conversation
    let conversation = await SupportConversation.findOne({
      customer: customerId,
      status: "open",
    })
      .populate("customer", "fullName email")
      .populate("assignedSupport", "fullName email");

    // If conversation already exists
    if (conversation) {
      return res.status(200).json({
        success: true,
        message: "Existing conversation found",
        conversation,
      });
    }

    // Create new conversation
    conversation = await SupportConversation.create({
      customer: customerId,
      status: "open",
    });

    // Get populated conversation
    conversation = await SupportConversation.findById(conversation._id)
      .populate("customer", "fullName email")
      .populate("assignedSupport", "fullName email");

    return res.status(201).json({
      success: true,
      message: "Support conversation created successfully",
      conversation,
    });
  } catch (error) {
    console.error("Create conversation error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// GET CUSTOMER'S CONVERSATION
// ==========================================
exports.getMyConversation = async (req, res) => {
  try {
    const customerId = req.user._id;

    const conversation = await SupportConversation.findOne({
      customer: customerId,
      status: "open",
    })
      .populate("customer", "fullName email")
      .populate("assignedSupport", "fullName email");

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "No active support conversation found",
      });
    }

    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error("Get conversation error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL OPEN CONVERSATIONS FOR SUPPORT
// ==========================================
exports.getSupportConversations = async (req, res) => {
  try {
    const conversations = await SupportConversation.find({
      status: "open",
    })
      .populate("customer", "fullName email")
      .populate("assignedSupport", "fullName email")
      .sort({ lastMessageAt: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });
  } catch (error) {
    console.error("Get support conversations error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ==========================================
// ASSIGN CONVERSATION TO SUPPORT STAFF
// ==========================================
exports.assignConversation = async (req, res) => {
  try {
    const conversation = await SupportConversation.findById(
      req.params.id
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }

    // Check whether another support staff already accepted it
    if (conversation.assignedSupport) {
      return res.status(400).json({
        success: false,
        message: "This conversation is already assigned to another support staff.",
      });
    }

    // Assign current logged-in support staff
    conversation.assignedSupport = req.user._id;

    await conversation.save();

    res.status(200).json({
      success: true,
      message: "Conversation assigned successfully.",
      conversation,
    });
  } catch (error) {
    console.error("Assign conversation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// SEND MESSAGE
// ============================================

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const conversationId = req.params.id;

    // Check message
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty."
      });
    }

    // Find conversation
    const conversation = await SupportConversation.findById(
      conversationId
    );

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    // Create message
    const newMessage = await SupportMessage.create({
      conversation: conversationId,
      sender: req.user._id,
      message: message.trim()
    });

    // Update conversation
    conversation.lastMessage = message.trim();
    conversation.lastMessageAt = new Date();

    await conversation.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage
    });

  } catch (error) {
    console.error("Send message error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message."
    });
  }
};

// ========================================
// GET ALL MESSAGES OF A CONVERSATION
// ========================================

exports.getConversationMessages = async (req, res) => {
  try {
    const { id } = req.params;

    // Check whether conversation exists
    const conversation = await SupportConversation.findById(id);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    // Get all messages
    const messages = await SupportMessage.find({
      conversation: id
    })
      .populate("sender", "fullName email role")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });

  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error."
    });
  }
};