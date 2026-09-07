const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: false 
  },
  role: {
  type: String,
  enum: ['customer', 'event_planner', 'admin','support'],
  default: 'customer'
  },
  googleId: { type: String },
  facebookId: { type: String },
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  profileDetails: {
    bio: { type: String, default: '' },
    phone: { type: String, default: '' },
    servicesOffered: { type: [String], default: [] }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
