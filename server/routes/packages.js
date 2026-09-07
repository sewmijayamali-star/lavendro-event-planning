const express = require("express");

const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

const upload = require("../middleware/upload");

const router = express.Router();

// Create package
router.post("/", upload.single("image"), createPackage);

// Get all packages
router.get("/", getPackages);

// Get one package
router.get("/:id", getPackageById);

// Update package
router.put("/:id", upload.single("image"), updatePackage);

// Delete package
router.delete("/:id", deletePackage);

module.exports = router;