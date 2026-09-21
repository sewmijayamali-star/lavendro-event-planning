const express = require("express");

const {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const router = express.Router();


// ==========================================
// CREATE PACKAGE
// POST /api/packages
// ==========================================
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createPackage
);


// ==========================================
// GET ALL PACKAGES
// GET /api/packages
// ==========================================
router.get(
  "/",
  getPackages
);


// ==========================================
// GET SINGLE PACKAGE
// GET /api/packages/:id
// ==========================================
router.get(
  "/:id",
  getPackageById
);


// ==========================================
// UPDATE PACKAGE
// PUT /api/packages/:id
// ==========================================
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updatePackage
);


// ==========================================
// DELETE PACKAGE
// DELETE /api/packages/:id
// ==========================================
router.delete(
  "/:id",
  protect,
  adminOnly,
  deletePackage
);


module.exports = router;