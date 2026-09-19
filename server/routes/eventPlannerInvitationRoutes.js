const express = require('express');
const router = express.Router();

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware');

const {
  inviteEventPlanner
} = require('../controllers/eventPlannerInvitationController');

router.post(
  '/invite',
  protect,
  adminOnly,
  inviteEventPlanner
);

module.exports = router;