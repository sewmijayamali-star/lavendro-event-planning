const express = require('express');

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware');

const {
  inviteAdmin
} = require('../controllers/adminInvitationController');

const router = express.Router();

router.post(
  '/',
  protect,
  adminOnly,
  inviteAdmin
);

module.exports = router;