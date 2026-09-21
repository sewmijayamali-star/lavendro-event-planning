const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} = require("../controllers/venueController");

// ==========================================
// GET ALL VENUES
// Public
// ==========================================
router.get("/", getVenues);

// ==========================================
// GET VENUE BY ID
// Public
// ==========================================
router.get("/:id", getVenueById);

// ==========================================
// CREATE VENUE
// Admin only
// ==========================================
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createVenue
);

// ==========================================
// UPDATE VENUE
// Admin only
// ==========================================
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateVenue
);

// ==========================================
// DELETE VENUE
// Admin only
// ==========================================
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteVenue
);

module.exports = router;