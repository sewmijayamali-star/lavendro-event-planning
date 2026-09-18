const express = require("express");

const router = express.Router();

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  inviteSupportStaff,
  acceptInvitation,
} = require("../controllers/supportInvitationController");


// =====================================================
// ADMIN → INVITE SUPPORT STAFF
// =====================================================

router.post(
  "/invite",
  protect,
  adminOnly,
  inviteSupportStaff
);


// =====================================================
// SUPPORT STAFF → ACCEPT INVITATION
// =====================================================

router.post(
  "/accept",
  acceptInvitation
);


module.exports = router;