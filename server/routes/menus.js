const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

// Get all menus
router.get("/", getMenus);

// Get menu by ID
router.get("/:id", getMenuById);

// Create menu with image
router.post("/", upload.single("image"), createMenu);

// Update menu with optional new image
router.put("/:id", upload.single("image"), updateMenu);

// Delete menu
router.delete("/:id", deleteMenu);

module.exports = router;