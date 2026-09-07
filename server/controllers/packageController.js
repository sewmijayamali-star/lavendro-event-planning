const crypto = require("crypto");
const Package = require("../models/Package");
const supabase = require("../config/supabase");

const BUCKET_NAME = "packages";

// ==========================================
// Helper: Upload image to Supabase
// ==========================================
const uploadImageToSupabase = async (file) => {
  if (!file) return "";

  const extension = file.originalname.split(".").pop().toLowerCase();

  const fileName = `package-${Date.now()}-${crypto
    .randomBytes(6)
    .toString("hex")}.${extension}`;

  const filePath = fileName;
 

console.log("========== SUPABASE UPLOAD DEBUG ==========");
console.log("SUPABASE URL:", process.env.SUPABASE_URL);
console.log("BUCKET NAME:", BUCKET_NAME);
console.log("FILE NAME:", fileName);
console.log("FILE PATH:", filePath);
console.log("ORIGINAL NAME:", file.originalname);
console.log("MIME TYPE:", file.mimetype);
console.log("============================================");

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
// Helper: Delete image from Supabase
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
// CREATE PACKAGE
// POST /api/packages
// ==========================================
const createPackage = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      duration,
      guests,
      features,
      isActive,
    } = req.body;

    // Required fields
    if (
      !name ||
      !description ||
      !category ||
      price === undefined ||
      !duration ||
      guests === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required package fields.",
      });
    }

    // Validate price
    if (Number(price) < 0) {
      return res.status(400).json({
        success: false,
        message: "Price cannot be negative.",
      });
    }

    // Validate guests
    if (Number(guests) < 1) {
      return res.status(400).json({
        success: false,
        message: "Guests must be at least 1.",
      });
    }

    // Parse features
    let parsedFeatures = [];

    if (features) {
      if (Array.isArray(features)) {
        parsedFeatures = features;
      } else {
        try {
          parsedFeatures = JSON.parse(features);
        } catch {
          parsedFeatures = features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        }
      }
    }

    // Upload image
    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadImageToSupabase(req.file);
    }

    // Create package
    const newPackage = await Package.create({
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price: Number(price),
      duration: duration.trim(),
      guests: Number(guests),
      features: parsedFeatures,
      image: imageUrl,
      isActive:
        isActive === undefined
          ? true
          : isActive === "false"
          ? false
          : Boolean(isActive),
    });

    return res.status(201).json({
      success: true,
      message: "Package created successfully.",
      package: newPackage,
    });
  } catch (error) {
    console.error("Create package error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create package.",
    });
  }
};

// ==========================================
// GET ALL PACKAGES
// GET /api/packages
// ==========================================
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: packages.length,
      packages,
    });
  } catch (error) {
    console.error("Get packages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch packages.",
    });
  }
};

// ==========================================
// GET SINGLE PACKAGE
// GET /api/packages/:id
// ==========================================
const getPackageById = async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    return res.status(200).json({
      success: true,
      package: packageItem,
    });
  } catch (error) {
    console.error("Get package error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch package.",
    });
  }
};

// ==========================================
// UPDATE PACKAGE
// PUT /api/packages/:id
// ==========================================
const updatePackage = async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    const {
      name,
      description,
      category,
      price,
      duration,
      guests,
      features,
      isActive,
    } = req.body;

    // Update text fields only when provided
    if (name !== undefined) {
      packageItem.name = name.trim();
    }

    if (description !== undefined) {
      packageItem.description = description.trim();
    }

    if (category !== undefined) {
      packageItem.category = category.trim();
    }

    if (price !== undefined) {
      if (Number(price) < 0) {
        return res.status(400).json({
          success: false,
          message: "Price cannot be negative.",
        });
      }

      packageItem.price = Number(price);
    }

    if (duration !== undefined) {
      packageItem.duration = duration.trim();
    }

    if (guests !== undefined) {
      if (Number(guests) < 1) {
        return res.status(400).json({
          success: false,
          message: "Guests must be at least 1.",
        });
      }

      packageItem.guests = Number(guests);
    }

    if (features !== undefined) {
      if (Array.isArray(features)) {
        packageItem.features = features;
      } else {
        try {
          packageItem.features = JSON.parse(features);
        } catch {
          packageItem.features = features
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        }
      }
    }

    if (isActive !== undefined) {
      packageItem.isActive =
        isActive === "false" ? false : Boolean(isActive);
    }

    // If a new image was uploaded
    if (req.file) {
      const oldImage = packageItem.image;

      const newImageUrl = await uploadImageToSupabase(req.file);

      packageItem.image = newImageUrl;

      // Delete old image after successful new upload
      if (oldImage) {
        await deleteImageFromSupabase(oldImage);
      }
    }

    await packageItem.save();

    return res.status(200).json({
      success: true,
      message: "Package updated successfully.",
      package: packageItem,
    });
  } catch (error) {
    console.error("Update package error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update package.",
    });
  }
};

// ==========================================
// DELETE PACKAGE
// DELETE /api/packages/:id
// ==========================================
const deletePackage = async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);

    if (!packageItem) {
      return res.status(404).json({
        success: false,
        message: "Package not found.",
      });
    }

    // Delete image from Supabase
    if (packageItem.image) {
      await deleteImageFromSupabase(packageItem.image);
    }

    // Delete MongoDB document
    await Package.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Package deleted successfully.",
    });
  } catch (error) {
    console.error("Delete package error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete package.",
    });
  }
};

module.exports = {
  createPackage,
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};