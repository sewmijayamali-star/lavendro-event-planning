

const express = require('express');

const router = express.Router();

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware');

const {
  getDashboard,
  getAdminProfile
} = require('../controllers/adminController');

// Admin Dashboard
router.get(
  '/dashboard',
  protect,
  adminOnly,
  getDashboard
);

// Admin Profile
router.get(
  '/profile',
  protect,
  adminOnly,
  getAdminProfile
);

module.exports = router;