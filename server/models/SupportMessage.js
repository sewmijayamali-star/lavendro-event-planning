const mongoose = require("mongoose");

const supportMessageSchema = new mongoose.Schema(
  {
    // Which conversation does this message belong to?
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupportConversation",
      required: true,
    },

    // Who sent the message?
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Message content
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Message status
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SupportMessage",
  supportMessageSchema
);