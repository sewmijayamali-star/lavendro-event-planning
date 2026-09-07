const mongoose = require("mongoose");

const supportConversationSchema = new mongoose.Schema(
  {
    // Customer who started the conversation
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Support staff assigned to this conversation
    assignedSupport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Conversation status
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },

    // Latest message preview
    lastMessage: {
      type: String,
      default: "",
    },

    // Time of latest message
    lastMessageAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SupportConversation",
  supportConversationSchema
);