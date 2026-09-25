const express = require('express');

const {
  getPublicEventPlanners,
  getPublicEventPlannerById
} = require('../controllers/eventPlannerController');

const router = express.Router();


// GET all active event planners
router.get('/', getPublicEventPlanners);


// GET single active event planner
router.get('/:id', getPublicEventPlannerById);


module.exports = router;