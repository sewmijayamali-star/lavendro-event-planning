import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  AddPhotoAlternate,
  Close,
} from "@mui/icons-material";

import "../styles/components/MenuForm.css";

const MenuForm = ({
  menuData,
  onSuccess,
  onCancel,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pricePerPerson: "",
    items: "",
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD EXISTING MENU FOR EDIT
  // ==========================================

  useEffect(() => {
    if (menuData) {
      setFormData({
        name: menuData.name || "",
        description: menuData.description || "",
        category: menuData.category || "",
        pricePerPerson: menuData.pricePerPerson ?? "",
        items: Array.isArray(menuData.items)
          ? menuData.items.join(", ")
          : menuData.items || "",
        isActive: menuData.isActive ?? true,
      });

      if (menuData.image) {
        setPreview(menuData.image);
      }
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        pricePerPerson: "",
        items: "",
        isActive: true,
      });

      setImage(null);
      setPreview("");
    }
  }, [menuData]);

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
  // IMAGE
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
      setError("Image size must be less than 5MB.");
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

    if (menuData?.image) {
      setPreview(menuData.image);
    } else {
      setPreview("");
    }

    const fileInput =
      document.getElementById("menu-image-input");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Menu name is required.");
      return false;
    }

    if (!formData.description.trim()) {
      setError("Menu description is required.");
      return false;
    }

    if (!formData.category.trim()) {
      setError("Menu category is required.");
      return false;
    }

    if (
      formData.pricePerPerson === "" ||
      Number(formData.pricePerPerson) < 0
    ) {
      setError(
        "Please enter a valid price per person."
      );
      return false;
    }

    if (!formData.items.trim()) {
      setError("Please add at least one menu item.");
      return false;
    }

    // Image required only when creating
    if (!menuData && !image) {
      setError("Please select a menu image.");
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
        "category",
        formData.category.trim()
      );

      data.append(
        "pricePerPerson",
        formData.pricePerPerson
      );

      const itemsArray = formData.items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      data.append(
        "items",
        JSON.stringify(itemsArray)
      );

      data.append(
        "isActive",
        formData.isActive
          ? "true"
          : "false"
      );

      // Only upload a new image if selected
      if (image) {
        data.append("image", image);
      }

      let response;

      // ========================================
      // CREATE
      // ========================================

      if (!menuData) {

        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/menus`,
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
          `${process.env.REACT_APP_API_URL}/api/menus/${menuData._id}`,
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
          onSuccess(response.data.menu);
        }
      }

    } catch (error) {

      console.error(
        menuData
          ? "Update menu error:"
          : "Create menu error:",
        error
      );

      setError(
        error.response?.data?.message ||
          (
            menuData
              ? "Failed to update menu."
              : "Failed to create menu."
          )
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menu-form">

      {/* HEADER */}

      <div className="menu-form-header">

        <div>

          <p className="menu-form-label">
            MENU MANAGEMENT
          </p>

          <h2>
            {menuData
              ? "Edit Menu"
              : "Add New Menu"}
          </h2>

          <p>
            {menuData
              ? "Update the menu information."
              : "Create a new food menu for Lavendro customers."}
          </p>

        </div>

        {onCancel && (
          <button
            type="button"
            className="menu-form-close"
            onClick={onCancel}
            disabled={loading}
          >
            <Close />
          </button>
        )}

      </div>

      {/* ERROR */}

      {error && (
        <div className="menu-form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* BASIC INFORMATION */}

        <div className="menu-form-section">

          <h3>
            Basic Information
          </h3>

          <div className="menu-form-grid">

            <div className="menu-form-group full-width">

              <label>
                Menu Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Premium Wedding Buffet"
                disabled={loading}
              />

            </div>

            <div className="menu-form-group full-width">

              <label>
                Description <span>*</span>
              </label>

              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the menu..."
                disabled={loading}
              />

            </div>

            <div className="menu-form-group">

              <label>
                Category <span>*</span>
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Wedding"
                disabled={loading}
              />

            </div>

            <div className="menu-form-group">

              <label>
                Price Per Person (LKR) <span>*</span>
              </label>

              <input
                type="number"
                name="pricePerPerson"
                min="0"
                value={formData.pricePerPerson}
                onChange={handleChange}
                placeholder="4500"
                disabled={loading}
              />

            </div>

          </div>

        </div>

        {/* ITEMS */}

        <div className="menu-form-section">

          <h3>
            Menu Items
          </h3>

          <div className="menu-form-group">

            <label>
              Food Items <span>*</span>
            </label>

            <textarea
              name="items"
              rows="5"
              value={formData.items}
              onChange={handleChange}
              placeholder="Chicken Biryani, Vegetable Fried Rice, Chicken Curry..."
              disabled={loading}
            />

            <small>
              Separate multiple food items using commas.
            </small>

          </div>

        </div>

        {/* IMAGE */}

        <div className="menu-form-section">

          <h3>
            Menu Image
          </h3>

          <div className="menu-image-upload">

            {!preview ? (

              <label
                htmlFor="menu-image-input"
                className="menu-image-dropzone"
              >

                <AddPhotoAlternate />

                <strong>
                  Upload Menu Image
                </strong>

                <span>
                  JPG, PNG, WEBP or GIF • Maximum 5MB
                </span>

              </label>

            ) : (

              <div className="menu-image-preview">

                <img
                  src={preview}
                  alt="Menu preview"
                />

                <button
                  type="button"
                  className="menu-remove-image"
                  onClick={removeImage}
                  disabled={loading}
                >
                  <Close />
                </button>

              </div>

            )}

            <input
              id="menu-image-input"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              disabled={loading}
              hidden
            />

          </div>

          {menuData && menuData.image && !image && (
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

        {/* STATUS */}

        <div className="menu-form-section">

          <h3>
            Menu Status
          </h3>

          <label className="menu-active-toggle">

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
              Menu is active and available to customers
            </span>

          </label>

        </div>

        {/* ACTIONS */}

        <div className="menu-form-actions">

          {onCancel && (
            <button
              type="button"
              className="menu-form-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="menu-form-submit"
            disabled={loading}
          >
            {loading
              ? menuData
                ? "Updating Menu..."
                : "Creating Menu..."
              : menuData
                ? "Update Menu"
                : "Create Menu"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default MenuForm;