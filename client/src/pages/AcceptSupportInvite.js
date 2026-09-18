import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../styles/AcceptSupportInvite.css";
const AcceptSupportInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // ACCEPT INVITATION
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/support/invitations/accept`,
        {
          token,
          fullName: formData.fullName,
          password: formData.password,
        }
      );

      setSuccess(response.data.message);

      // Clear form
      setFormData({
        fullName: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login after successful account creation
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to accept invitation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="accept-support-page">

      <div className="accept-support-card">

        {/* LOGO */}
        <div className="support-logo">
          <div className="support-logo-mark">L</div>

          <div>
            <h2>Lavendro</h2>
            <span>Event Planning</span>
          </div>
        </div>


        {/* HEADER */}
        <div className="support-header">
          <p className="support-label">
            SUPPORT TEAM
          </p>

          <h1>
            Join Lavendro Support
          </h1>

          <p>
            You have been invited to join
            Lavendro Event Planning as a
            Support Staff member.
          </p>
        </div>


        {/* ERROR */}
        {error && (
          <div className="support-message error">
            {error}
          </div>
        )}


        {/* SUCCESS */}
        {success && (
          <div className="support-message success">
            {success}
            <br />
            Redirecting to login...
          </div>
        )}


        {/* FORM */}
        <form onSubmit={handleSubmit}>

          {/* FULL NAME */}
          <div className="form-group">
            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>


          {/* PASSWORD */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create your password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>


          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>


          {/* INVITATION INFO */}
          <div className="invitation-info">
            <strong>Invitation validity</strong>
            <span>
              This invitation is valid for 24 hours.
            </span>
          </div>


          {/* SUBMIT */}
          <button
            type="submit"
            className="accept-support-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Accept Invitation"}
          </button>

        </form>


        {/* FOOTER */}
        <div className="support-footer">
          <p>
            Already have a Lavendro account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>

      </div>

    </div>
  );
};

export default AcceptSupportInvite;