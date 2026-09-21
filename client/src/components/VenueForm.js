import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  AddPhotoAlternate,
  Close,
  LocationOn,
} from "@mui/icons-material";

import "../styles/components/VenueForm.css";

const VenueForm = ({
  venueData,
  onSuccess,
  onCancel,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    capacity: "",
    pricePerDay: "",
    amenities: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD VENUE DATA FOR EDIT
  // ==========================================

  useEffect(() => {

    if (venueData) {

      setFormData({
        name: venueData.name || "",
        description: venueData.description || "",
        location: venueData.location || "",
        capacity: venueData.capacity ?? "",
        pricePerDay: venueData.pricePerDay ?? "",
        amenities: Array.isArray(
          venueData.amenities
        )
          ? venueData.amenities.join(", ")
          : venueData.amenities || "",
        isActive: venueData.isActive ?? true,
      });

      if (venueData.image) {
        setPreview(venueData.image);
      }

    } else {

      setFormData({
        name: "",
        description: "",
        location: "",
        capacity: "",
        pricePerDay: "",
        amenities: "",
        isActive: true,
      });

      setImage(null);
      setPreview("");
    }

  }, [venueData]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  // ==========================================
  // IMAGE CHANGE
  // ==========================================

  const handleImageChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {

      setError(
        "Please select a JPG, JPEG, PNG, WEBP or GIF image."
      );

      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {

      setError(
        "Image size must be less than 5MB."
      );

      return;
    }

    setError("");

    setImage(selectedFile);

    const imageUrl =
      URL.createObjectURL(selectedFile);

    setPreview(imageUrl);

  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = () => {

    setImage(null);

    if (venueData?.image) {
      setPreview(venueData.image);
    } else {
      setPreview("");
    }

    const fileInput =
      document.getElementById(
        "venue-image-input"
      );

    if (fileInput) {
      fileInput.value = "";
    }

  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {

    if (!formData.name.trim()) {

      setError("Venue name is required.");

      return false;
    }

    if (!formData.description.trim()) {

      setError(
        "Venue description is required."
      );

      return false;
    }

    if (!formData.location.trim()) {

      setError(
        "Venue location is required."
      );

      return false;
    }

    if (
      formData.capacity === "" ||
      Number(formData.capacity) < 1
    ) {

      setError(
        "Venue capacity must be at least 1."
      );

      return false;
    }

    if (
      formData.pricePerDay === "" ||
      Number(formData.pricePerDay) < 0
    ) {

      setError(
        "Please enter a valid price per day."
      );

      return false;
    }

    if (!formData.amenities.trim()) {

      setError(
        "Please add at least one venue amenity."
      );

      return false;
    }

    // Image required only for CREATE
    if (!venueData && !image) {

      setError(
        "Please select a venue image."
      );

      return false;
    }

    return true;
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!validateForm()) return;

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const data = new FormData();

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "location",
        formData.location.trim()
      );

      data.append(
        "capacity",
        formData.capacity
      );

      data.append(
        "pricePerDay",
        formData.pricePerDay
      );

      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      data.append(
        "amenities",
        JSON.stringify(amenitiesArray)
      );

      data.append(
        "isActive",
        formData.isActive
          ? "true"
          : "false"
      );

      // Only upload a new image
      // when one is selected
      if (image) {
        data.append("image", image);
      }

      let response;

      // ========================================
      // CREATE VENUE
      // ========================================

      if (!venueData) {

        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/venues`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      // ========================================
      // UPDATE VENUE
      // ========================================

      else {

        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/venues/${venueData._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      // ========================================
      // SUCCESS
      // ========================================

      if (response.data.success) {

        if (onSuccess) {
          onSuccess(response.data.venue);
        }

      }

    } catch (error) {

      console.error(
        venueData
          ? "Update venue error:"
          : "Create venue error:",
        error
      );

      setError(
        error.response?.data?.message ||
          (
            venueData
              ? "Failed to update venue."
              : "Failed to create venue."
          )
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="venue-form">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="venue-form-header">

        <div>

          <p className="venue-form-label">
            VENUE MANAGEMENT
          </p>

          <h2>
            {venueData
              ? "Edit Venue"
              : "Add New Venue"}
          </h2>

          <p>
            {venueData
              ? "Update the venue information."
              : "Create a new event venue for Lavendro customers."}
          </p>

        </div>

        {onCancel && (

          <button
            type="button"
            className="venue-form-close"
            onClick={onCancel}
            disabled={loading}
          >
            <Close />
          </button>

        )}

      </div>

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (

        <div className="venue-form-error">
          {error}
        </div>

      )}

      <form onSubmit={handleSubmit}>

        {/* ===================================
            BASIC INFORMATION
        =================================== */}

        <div className="venue-form-section">

          <h3>
            Basic Information
          </h3>

          <div className="venue-form-grid">

            {/* NAME */}

            <div className="venue-form-group full-width">

              <label>
                Venue Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Lavendro Grand Ballroom"
                disabled={loading}
              />

            </div>

            {/* DESCRIPTION */}

            <div className="venue-form-group full-width">

              <label>
                Description <span>*</span>
              </label>

              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the venue..."
                disabled={loading}
              />

            </div>

            {/* LOCATION */}

            <div className="venue-form-group full-width">

              <label>
                Location <span>*</span>
              </label>

              <div className="venue-location-input">

                <LocationOn />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Example: Colombo, Sri Lanka"
                  disabled={loading}
                />

              </div>

            </div>

            {/* CAPACITY */}

            <div className="venue-form-group">

              <label>
                Maximum Capacity <span>*</span>
              </label>

              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="300"
                disabled={loading}
              />

            </div>

            {/* PRICE */}

            <div className="venue-form-group">

              <label>
                Price Per Day (LKR) <span>*</span>
              </label>

              <input
                type="number"
                name="pricePerDay"
                min="0"
                value={formData.pricePerDay}
                onChange={handleChange}
                placeholder="150000"
                disabled={loading}
              />

            </div>

          </div>

        </div>

        {/* ===================================
            AMENITIES
        =================================== */}

        <div className="venue-form-section">

          <h3>
            Venue Amenities
          </h3>

          <div className="venue-form-group">

            <label>
              Amenities <span>*</span>
            </label>

            <textarea
              name="amenities"
              rows="4"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="Air Conditioning, Parking, Sound System, Stage, Bridal Room"
              disabled={loading}
            />

            <small>
              Separate multiple amenities using commas.
            </small>

          </div>

        </div>

        {/* ===================================
            IMAGE
        =================================== */}

        <div className="venue-form-section">

          <h3>
            Venue Image
          </h3>

          <div className="venue-image-upload">

            {!preview ? (

              <label
                htmlFor="venue-image-input"
                className="venue-image-dropzone"
              >

                <AddPhotoAlternate />

                <strong>
                  Upload Venue Image
                </strong>

                <span>
                  JPG, PNG, WEBP or GIF • Maximum 5MB
                </span>

              </label>

            ) : (

              <div className="venue-image-preview">

                <img
                  src={preview}
                  alt="Venue preview"
                />

                <button
                  type="button"
                  className="venue-remove-image"
                  onClick={removeImage}
                  disabled={loading}
                >
                  <Close />
                </button>

              </div>

            )}

            <input
              id="venue-image-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              disabled={loading}
              hidden
            />

          </div>

          {venueData &&
            venueData.image &&
            !image && (

              <small
                style={{
                  display: "block",
                  marginTop: "8px",
                  color: "#777",
                }}
              >
                Current image will be kept unless you
                select a new image.
              </small>

            )}

        </div>

        {/* ===================================
            STATUS
        =================================== */}

        <div className="venue-form-section">

          <h3>
            Venue Status
          </h3>

          <label className="venue-active-toggle">

            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((previous) => ({
                  ...previous,
                  isActive:
                    e.target.checked,
                }))
              }
              disabled={loading}
            />

            <span>
              Venue is active and available to customers
            </span>

          </label>

        </div>

        {/* ===================================
            ACTIONS
        =================================== */}

        <div className="venue-form-actions">

          {onCancel && (

            <button
              type="button"
              className="venue-form-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>

          )}

          <button
            type="submit"
            className="venue-form-submit"
            disabled={loading}
          >

            {loading
              ? venueData
                ? "Updating Venue..."
                : "Creating Venue..."
              : venueData
                ? "Update Venue"
                : "Create Venue"}

          </button>

        </div>

      </form>

    </div>

  );
};

export default VenueForm;