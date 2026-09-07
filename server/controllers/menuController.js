const crypto = require("crypto");
const Menu = require("../models/Menu");
const supabase = require("../config/supabase");

const BUCKET_NAME = "menus";

// ==========================================
// Upload image to Supabase
// ==========================================
const uploadImageToSupabase = async (file) => {
  if (!file) return "";

  const extension = file.originalname.split(".").pop().toLowerCase();

  const fileName = `menu-${Date.now()}-${crypto
    .randomBytes(6)
    .toString("hex")}.${extension}`;

  const filePath = fileName;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return data.publicUrl;
};

// ==========================================
// Delete image from Supabase
// ==========================================
const deleteImageFromSupabase = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);

    const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;

    const index = url.pathname.indexOf(marker);

    if (index === -1) return;

    const filePath = decodeURIComponent(
      url.pathname.substring(index + marker.length)
    );

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("Supabase image delete error:", error.message);
    }
  } catch (error) {
    console.error("Could not delete old image:", error.message);
  }
};

// ==========================================
// CREATE MENU
// ==========================================
const createMenu = async (req, res) => {
  try {
    console.log("MENU BODY:", req.body);
    console.log("MENU FILE:", req.file);

    const {
      name,
      description,
      category,
      pricePerPerson,
      items,
      isActive,
    } = req.body;

    const imageUrl = await uploadImageToSupabase(req.file);

    const menu = await Menu.create({
      name,
      description,
      category,
      pricePerPerson,
      items: Array.isArray(items) ? items : JSON.parse(items || "[]"),
      image: imageUrl,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "Menu created successfully.",
      menu,
    });
  } catch (error) {
    console.error("Create menu error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL MENUS
// ==========================================
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: menus.length,
      menus,
    });
  } catch (error) {
    console.error("Get menus error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET MENU BY ID
// ==========================================
const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found.",
      });
    }

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    console.error("Get menu by ID error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE MENU
// ==========================================
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found.",
      });
    }

    const {
      name,
      description,
      category,
      pricePerPerson,
      items,
      isActive,
    } = req.body;

    if (name !== undefined) menu.name = name;
    if (description !== undefined) menu.description = description;
    if (category !== undefined) menu.category = category;
    if (pricePerPerson !== undefined)
      menu.pricePerPerson = pricePerPerson;

    if (items !== undefined) {
      menu.items = Array.isArray(items) ? items : JSON.parse(items);
    }

    if (isActive !== undefined) {
      menu.isActive = isActive;
    }

    // If new image is uploaded
    if (req.file) {
      const oldImage = menu.image;

      const newImageUrl = await uploadImageToSupabase(req.file);

      menu.image = newImageUrl;

      // Delete old image after successful new upload
      if (oldImage) {
        await deleteImageFromSupabase(oldImage);
      }
    }

    await menu.save();

    res.status(200).json({
      success: true,
      message: "Menu updated successfully.",
      menu,
    });
  } catch (error) {
    console.error("Update menu error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE MENU
// ==========================================
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found.",
      });
    }

    // Delete image from Supabase
    if (menu.image) {
      await deleteImageFromSupabase(menu.image);
    }

    await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully.",
    });
  } catch (error) {
    console.error("Delete menu error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};