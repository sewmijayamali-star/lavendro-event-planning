const crypto = require("crypto");
const Venue = require("../models/Venue");
const supabase = require("../config/supabase");

const BUCKET_NAME = "venues";

// ==========================================
// Upload image to Supabase
// ==========================================
const uploadImageToSupabase = async (file) => {
  if (!file) return "";

  const extension = file.originalname.split(".").pop().toLowerCase();

  const fileName = `venue-${Date.now()}-${crypto
    .randomBytes(6)
    .toString("hex")}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

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
// CREATE VENUE
// ==========================================
const createVenue = async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      capacity,
      pricePerDay,
      amenities,
      isActive,
    } = req.body;

    const imageUrl = await uploadImageToSupabase(req.file);

    const venue = await Venue.create({
      name,
      description,
      location,
      capacity,
      pricePerDay,
      amenities: Array.isArray(amenities)
        ? amenities
        : JSON.parse(amenities || "[]"),
      image: imageUrl,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "Venue created successfully.",
      venue,
    });
  } catch (error) {
    console.error("Create venue error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL VENUES
// ==========================================
const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: venues.length,
      venues,
    });
  } catch (error) {
    console.error("Get venues error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET VENUE BY ID
// ==========================================
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    res.status(200).json({
      success: true,
      venue,
    });
  } catch (error) {
    console.error("Get venue by ID error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE VENUE
// ==========================================
const updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    const {
      name,
      description,
      location,
      capacity,
      pricePerDay,
      amenities,
      isActive,
    } = req.body;

    if (name !== undefined) venue.name = name;
    if (description !== undefined) venue.description = description;
    if (location !== undefined) venue.location = location;
    if (capacity !== undefined) venue.capacity = capacity;
    if (pricePerDay !== undefined) venue.pricePerDay = pricePerDay;

    if (amenities !== undefined) {
      venue.amenities = Array.isArray(amenities)
        ? amenities
        : JSON.parse(amenities);
    }

    if (isActive !== undefined) {
      venue.isActive = isActive;
    }

    // Upload new image if provided
    if (req.file) {
      const oldImage = venue.image;

      const newImageUrl = await uploadImageToSupabase(req.file);

      venue.image = newImageUrl;

      // Delete old image after successful upload
      if (oldImage) {
        await deleteImageFromSupabase(oldImage);
      }
    }

    await venue.save();

    res.status(200).json({
      success: true,
      message: "Venue updated successfully.",
      venue,
    });
  } catch (error) {
    console.error("Update venue error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE VENUE
// ==========================================
const deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found.",
      });
    }

    if (venue.image) {
      await deleteImageFromSupabase(venue.image);
    }

    await Venue.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Venue deleted successfully.",
    });
  } catch (error) {
    console.error("Delete venue error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};