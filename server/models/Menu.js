const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  categories: {
    appetizers: [String],
    mainCourse: [String],
    salads: [String],
    desserts: [String],
    drinks: [String]
  },
  price: { type: String },
  image: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);
