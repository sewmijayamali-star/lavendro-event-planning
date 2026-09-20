const express = require("express");

const router = express.Router();

const {
  inviteEventPlanner
} = require("../controllers/eventPlannerInvitationController");

const {
  getEventPlannerInvitation
} = require("../controllers/eventPlannerInvitationController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");


// Admin sends invitation
router.post(
  "/invite",
  protect,
  adminOnly,
  inviteEventPlanner
);


// Event Planner verifies invitation
router.get(
  "/:token",
  getEventPlannerInvitation
);


module.exports = router;