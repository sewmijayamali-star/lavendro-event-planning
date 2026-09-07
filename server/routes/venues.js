const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} = require("../controllers/venueController");

// Get all venues
router.get("/", getVenues);

// Get venue by ID
router.get("/:id", getVenueById);

// Create venue with image
router.post("/", upload.single("image"), createVenue);

// Update venue with optional new image
router.put("/:id", upload.single("image"), updateVenue);

// Delete venue
router.delete("/:id", deleteVenue);

module.exports = router;