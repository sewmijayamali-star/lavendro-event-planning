import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  AddPhotoAlternate,
  Close,
} from "@mui/icons-material";

import "../styles/components/PackageForm.css";

const PackageForm = ({
  packageData,
  onSuccess,
  onCancel,
}) => {

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    guests: "",
    features: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD PACKAGE DATA FOR EDIT
  // ==========================================

  useEffect(() => {

    if (packageData) {

      setFormData({
        name: packageData.name || "",
        description: packageData.description || "",
        category: packageData.category || "",
        price: packageData.price ?? "",
        duration: packageData.duration || "",
        guests: packageData.guests ?? "",
        features: Array.isArray(packageData.features)
          ? packageData.features.join(", ")
          : packageData.features || "",
        isActive: packageData.isActive ?? true,
      });

      // Show existing image
      if (packageData.image) {
        setPreview(packageData.image);
      }

    } else {

      // Reset form for CREATE mode

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        duration: "",
        guests: "",
        features: "",
        isActive: true,
      });

      setImage(null);
      setPreview("");

    }

  }, [packageData]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  // ==========================================
  // HANDLE IMAGE CHANGE
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

    // If editing and existing image exists,
    // keep the existing image unless a new image
    // is selected.

    if (packageData?.image) {
      setPreview(packageData.image);
    } else {
      setPreview("");
    }

    const fileInput =
      document.getElementById(
        "package-image-input"
      );

    if (fileInput) {
      fileInput.value = "";
    }

  };

  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const validateForm = () => {

    if (!formData.name.trim()) {

      setError(
        "Package name is required."
      );

      return false;
    }

    if (!formData.description.trim()) {

      setError(
        "Package description is required."
      );

      return false;
    }

    if (!formData.category.trim()) {

      setError(
        "Package category is required."
      );

      return false;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {

      setError(
        "Please enter a valid package price."
      );

      return false;
    }

    if (!formData.duration.trim()) {

      setError(
        "Package duration is required."
      );

      return false;
    }

    if (
      formData.guests === "" ||
      Number(formData.guests) < 1
    ) {

      setError(
        "Guests must be at least 1."
      );

      return false;
    }

    // Image is required only when creating
    if (!packageData && !image) {

      setError(
        "Please select a package image."
      );

      return false;
    }

    return true;
  };

  // ==========================================
  // SUBMIT FORM
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
        "category",
        formData.category.trim()
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "duration",
        formData.duration.trim()
      );

      data.append(
        "guests",
        formData.guests
      );

      data.append(
        "features",
        formData.features.trim()
      );

      data.append(
        "isActive",
        formData.isActive
          ? "true"
          : "false"
      );

      // Only send image if a new image was selected
      if (image) {
        data.append("image", image);
      }

      let response;

      // ========================================
      // CREATE
      // ========================================

      if (!packageData) {

        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/packages`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      // ========================================
      // UPDATE
      // ========================================

      else {

        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/packages/${packageData._id}`,
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
          onSuccess(
            response.data.package
          );
        }

      }

    } catch (error) {

      console.error(
        packageData
          ? "Update package error:"
          : "Create package error:",
        error
      );

      setError(
        error.response?.data?.message ||
          (
            packageData
              ? "Failed to update package."
              : "Failed to create package."
          )
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="package-form">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="package-form-header">

        <div>

          <p className="package-form-label">
            PACKAGE MANAGEMENT
          </p>

          <h2>
            {packageData
              ? "Edit Package"
              : "Add New Package"}
          </h2>

          <p>
            {packageData
              ? "Update the event package information."
              : "Create a new event package for Lavendro customers."}
          </p>

        </div>

        {onCancel && (

          <button
            type="button"
            className="package-form-close"
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

        <div className="package-form-error">
          {error}
        </div>

      )}

      {/* =====================================
          FORM
      ===================================== */}

      <form onSubmit={handleSubmit}>

        {/* ===================================
            BASIC INFORMATION
        =================================== */}

        <div className="package-form-section">

          <h3>
            Basic Information
          </h3>

          <div className="package-form-grid">

            {/* NAME */}

            <div className="package-form-group full-width">

              <label>
                Package Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Example: Premium Wedding Package"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />

            </div>

            {/* DESCRIPTION */}

            <div className="package-form-group full-width">

              <label>
                Description <span>*</span>
              </label>

              <textarea
                name="description"
                rows="4"
                placeholder="Describe what is included in this package..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />

            </div>

            {/* CATEGORY */}

            <div className="package-form-group">

              <label>
                Category <span>*</span>
              </label>

              <input
                type="text"
                name="category"
                placeholder="Wedding"
                value={formData.category}
                onChange={handleChange}
                disabled={loading}
              />

            </div>

            {/* PRICE */}

            <div className="package-form-group">

              <label>
                Price (LKR) <span>*</span>
              </label>

              <input
                type="number"
                name="price"
                min="0"
                placeholder="250000"
                value={formData.price}
                onChange={handleChange}
                disabled={loading}
              />

            </div>

            {/* DURATION */}

            <div className="package-form-group">

              <label>
                Duration <span>*</span>
              </label>

              <input
                type="text"
                name="duration"
                placeholder="8 Hours"
                value={formData.duration}
                onChange={handleChange}
                disabled={loading}
              />

            </div>

            {/* GUESTS */}

            <div className="package-form-group">

              <label>
                Maximum Guests <span>*</span>
              </label>

              <input
                type="number"
                name="guests"
                min="1"
                placeholder="150"
                value={formData.guests}
                onChange={handleChange}
                disabled={loading}
              />

            </div>

          </div>

        </div>

        {/* ===================================
            FEATURES
        =================================== */}

        <div className="package-form-section">

          <h3>
            Package Features
          </h3>

          <div className="package-form-group">

            <label>
              Features
            </label>

            <textarea
              name="features"
              rows="3"
              placeholder="Photography, Catering, Decoration, Sound System"
              value={formData.features}
              onChange={handleChange}
              disabled={loading}
            />

            <small>
              Separate multiple features using commas.
            </small>

          </div>

        </div>

        {/* ===================================
            IMAGE
        =================================== */}

        <div className="package-form-section">

          <h3>
            Package Image
          </h3>

          <div className="package-image-upload">

            {!preview ? (

              <label
                htmlFor="package-image-input"
                className="package-image-dropzone"
              >

                <AddPhotoAlternate />

                <strong>
                  Upload Package Image
                </strong>

                <span>
                  JPG, PNG, WEBP or GIF • Maximum 5MB
                </span>

              </label>

            ) : (

              <div className="package-image-preview">

                <img
                  src={preview}
                  alt="Package preview"
                />

                <button
                  type="button"
                  className="package-remove-image"
                  onClick={removeImage}
                  disabled={loading}
                >
                  <Close />
                </button>

              </div>

            )}

            <input
              id="package-image-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              disabled={loading}
              hidden
            />

          </div>

          {/* EDIT MODE IMAGE NOTE */}

          {packageData && packageData.image && !image && (

            <small
              style={{
                display: "block",
                marginTop: "8px",
                color: "#777",
              }}
            >
              Current image will be kept unless you select
              a new image.
            </small>

          )}

        </div>

        {/* ===================================
            STATUS
        =================================== */}

        <div className="package-form-section">

          <h3>
            Package Status
          </h3>

          <label className="package-active-toggle">

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
              Package is active and available to customers
            </span>

          </label>

        </div>

        {/* ===================================
            ACTIONS
        =================================== */}

        <div className="package-form-actions">

          {onCancel && (

            <button
              type="button"
              className="package-form-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>

          )}

          <button
            type="submit"
            className="package-form-submit"
            disabled={loading}
          >

            {loading
              ? packageData
                ? "Updating Package..."
                : "Creating Package..."
              : packageData
                ? "Update Package"
                : "Create Package"}

          </button>

        </div>

      </form>

    </div>

  );
};

export default PackageForm;