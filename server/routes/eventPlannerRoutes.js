const express = require('express');
const router = express.Router();

const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const {
  getEventPlanners,
  createEventPlanner
} = require('../controllers/eventPlannerController');


// Get all event planners
router.get(
  '/',
  protect,
  adminOnly,
  getEventPlanners
);


// Create event planner directly
router.post(
  '/',
  protect,
  adminOnly,
  upload.single('profilePhoto'),
  createEventPlanner
);


module.exports = router;