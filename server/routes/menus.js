const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

// ==========================================
// GET ALL MENUS
// Public - customers can view menus
// ==========================================
router.get("/", getMenus);

// ==========================================
// GET MENU BY ID
// Public - customers can view menu details
// ==========================================
router.get("/:id", getMenuById);

// ==========================================
// CREATE MENU
// Admin only
// ==========================================
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createMenu
);

// ==========================================
// UPDATE MENU
// Admin only
// ==========================================
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateMenu
);

// ==========================================
// DELETE MENU
// Admin only
// ==========================================
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteMenu
);

module.exports = router;