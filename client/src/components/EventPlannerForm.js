import React, { useState } from "react";
import axios from "axios";
import "../styles/components/EventPlannerForm.css";

const EventPlannerForm = ({
  mode = "admin",
  invitationToken = null,
  invitationEmail = "",
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: invitationEmail,
    password: "",
    confirmPassword: "",
    qualifications: ""
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile photo must be less than 5MB.");
      return;
    }

    setProfilePhoto(file);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!profilePhoto) {
      setError("Please select a profile photo.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("firstName", formData.firstName.trim());
      data.append("lastName", formData.lastName.trim());
      data.append("email", formData.email.trim());
      data.append("password", formData.password);
      data.append(
        "qualifications",
        formData.qualifications.trim()
      );
      data.append("profilePhoto", profilePhoto);

      let response;

      if (mode === "invitation") {
        data.append("token", invitationToken);

        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/event-planner/invitations/accept`,
          data
        );
      } else {
        const token = localStorage.getItem("token");

        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/event-planners`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      setSuccess(
        response.data.message ||
          "Event planner created successfully."
      );

      if (onSuccess) {
        onSuccess(response.data);
      }

    } catch (error) {
      console.error(
        "Event planner creation error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create event planner."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-planner-form-container">

      <div className="event-planner-form-header">
        <h2>
          {mode === "invitation"
            ? "Create Your Event Planner Profile"
            : "Add Event Planner"}
        </h2>

        <p>
          {mode === "invitation"
            ? "Complete your profile to join Lavendro Event Planning."
            : "Create a new Event Planner account for Lavendro."}
        </p>
      </div>

      {error && (
        <div className="event-planner-form-error">
          {error}
        </div>
      )}

      {success && (
        <div className="event-planner-form-success">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* First Name */}
        <div className="planner-form-group">
          <label>
            First Name <span>*</span>
          </label>

          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Last Name */}
        <div className="planner-form-group">
          <label>
            Last Name <span>*</span>
          </label>

          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="planner-form-group">
          <label>
            Email <span>*</span>
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            disabled={
              loading || mode === "invitation"
            }
          />

          {mode === "invitation" && (
            <small>
              This email was provided in the invitation
              and cannot be changed.
            </small>
          )}
        </div>

        {/* Password */}
        <div className="planner-form-group">
          <label>
            Password <span>*</span>
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Confirm Password */}
        <div className="planner-form-group">
          <label>
            Confirm Password <span>*</span>
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Qualifications */}
        <div className="planner-form-group">
          <label>Qualifications</label>

          <textarea
            name="qualifications"
            placeholder="Enter qualifications, certifications, degrees..."
            value={formData.qualifications}
            onChange={handleChange}
            rows="4"
            disabled={loading}
          />
        </div>

        {/* Profile Photo */}
        <div className="planner-form-group">
          <label>
            Profile Photo <span>*</span>
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            disabled={loading}
          />

          {profilePhoto && (
            <div className="selected-photo">
              Selected: {profilePhoto.name}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="planner-form-actions">

          {onCancel && (
            <button
              type="button"
              className="planner-cancel-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="planner-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : mode === "invitation"
              ? "Create Event Planner Account"
              : "Create Event Planner"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default EventPlannerForm;