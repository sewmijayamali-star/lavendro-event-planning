const express = require('express');

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware');

const {
  inviteAdmin,
  acceptInvitation
} = require('../controllers/adminInvitationController');

const router = express.Router();

// Temporary test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Admin invitation routes are working'
  });
});

// Create admin invitation
router.post(
  '/',
  protect,
  adminOnly,
  inviteAdmin
);

// Accept admin invitation
router.post(
  '/accept',
  acceptInvitation
);

module.exports = router;