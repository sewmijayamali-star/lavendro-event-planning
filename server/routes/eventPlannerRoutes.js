const express = require('express');
const router = express.Router();

const {
  protect,
  adminOnly
} = require('../middleware/authMiddleware');

const {
  getEventPlanners
} = require('../controllers/eventPlannerController');

router.get(
  '/',
  protect,
  adminOnly,
  getEventPlanners
);

module.exports = router;