const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { 
    type: String, 
    required: true, 
    enum: ['user', 'admin'] 
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  status: { 
    type: String, 
    default: 'New', 
    enum: ['New', 'Read', 'Replied', 'Closed'] 
  },
  userId: { type: String },
  conversation: [messageSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
