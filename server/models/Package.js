const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String, required: true },
  popular: { type: Boolean, default: false },
  category: { type: String, enum: ['Wedding', 'Birthday', 'Corporate', 'Anniversary', 'Other'], default: 'Other' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);
