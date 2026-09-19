const mongoose = require('mongoose');

const eventPlannerInvitationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true
    },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'expired', 'revoked'],
      default: 'pending',
      index: true
    },

    acceptedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'EventPlannerInvitation',
  eventPlannerInvitationSchema
);