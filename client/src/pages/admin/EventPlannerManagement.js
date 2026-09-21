import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/eventPlannerManagement.css";
import EventPlannerForm from "../../components/EventPlannerForm";

const EventPlannerManagement = () => {
  const navigate = useNavigate();

  const [eventPlanners, setEventPlanners] = useState([]);

  // Add Event Planner options modal
  const [showAddOptionsModal, setShowAddOptionsModal] = useState(false);

  // Invite by Email modal
  const [showInviteModal, setShowInviteModal] = useState(false);

  const [showDirectAddModal, setShowDirectAddModal] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // --------------------------------------------------
  // Check Admin Access
  // --------------------------------------------------

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);

      if (parsedUser.role !== "admin") {
        navigate("/");
      }
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  // --------------------------------------------------
  // Send Event Planner Invitation
  // --------------------------------------------------

  const handleSendInvitation = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/event-planners/invite`,
        {
          email: email.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Event planner invitation sent successfully."
      );

      setEmail("");
      setShowInviteModal(false);
    } catch (error) {
      console.error(
        "Event planner invitation error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to send event planner invitation."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Close Add Options Modal
  // --------------------------------------------------

  const handleCloseAddOptions = () => {
    setShowAddOptionsModal(false);
  };

  // --------------------------------------------------
  // Open Invite Modal
  // --------------------------------------------------

  const handleInviteByEmail = () => {
    setShowAddOptionsModal(false);
    setShowInviteModal(true);
    setMessage("");
    setError("");
  };

  // --------------------------------------------------
  // Add Directly
  // --------------------------------------------------

  const handleAddDirectly = () => {
  setShowAddOptionsModal(false);
  setShowDirectAddModal(true);
  setMessage("");
  setError("");
};

  return (
    <div className="event-planner-management-page">

      {/* --------------------------------------------------
          Page Header
      -------------------------------------------------- */}

      <div className="event-planner-page-header">
        <div>
          <h1>Event Planners</h1>

          <p>
            Manage Lavendro event planning professionals
          </p>
        </div>

        <button
          className="add-planner-btn"
          onClick={() => {
            setShowAddOptionsModal(true);
            setMessage("");
            setError("");
          }}
        >
          + Add Event Planner
        </button>
      </div>

      {/* --------------------------------------------------
          Success Message
      -------------------------------------------------- */}

      {message && (
        <div className="planner-success-message">
          {message}
        </div>
      )}

      {/* --------------------------------------------------
          Error Message
      -------------------------------------------------- */}

      {error && !showInviteModal && (
        <div className="planner-error-message">
          {error}
        </div>
      )}

      {/* --------------------------------------------------
          Current Event Planners
      -------------------------------------------------- */}

      <div className="event-planner-management-card">

        <div className="management-card-header">
          <div>
            <h2>Current Event Planners</h2>

            <p>
              View and manage your event planning team.
            </p>
          </div>
        </div>

        {eventPlanners.length === 0 ? (
          <div className="empty-planners-state">

            <div className="empty-planner-icon">
              👤
            </div>

            <h3>No Event Planners Yet</h3>

            <p>
              Add an event planner to your Lavendro
              planning team.
            </p>

            <button
              className="add-planner-empty-btn"
              onClick={() => {
                setShowAddOptionsModal(true);
                setMessage("");
                setError("");
              }}
            >
              Add Event Planner
            </button>

          </div>
        ) : (
          <div className="event-planners-list">

            {/* Planner list will be connected to API next */}

            {eventPlanners.map((planner) => (
              <div
                className="event-planner-item"
                key={planner._id}
              >
                <div>
                  <strong>{planner.fullName}</strong>

                  <p>{planner.email}</p>
                </div>

                <span>
                  {planner.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* ==================================================
          ADD EVENT PLANNER OPTIONS MODAL
      ================================================== */}

      {showAddOptionsModal && (
        <div className="planner-modal-overlay">

          <div className="add-planner-options-modal">

            <button
              className="planner-modal-close"
              onClick={handleCloseAddOptions}
              type="button"
            >
              ×
            </button>

            <div className="add-planner-options-header">

              <h2>Add Event Planner</h2>

              <p>
                How would you like to add?
              </p>

            </div>

            <div className="add-planner-options">

              {/* --------------------------------------------------
                  Invite by Email
              -------------------------------------------------- */}

              <div className="add-planner-option-card">

                <div className="option-icon">
                  📧
                </div>

                <h3>
                  Invite by Email
                </h3>

                <p>
                  Send an invitation to the planner.
                </p>

                <button
                  className="option-select-btn"
                  onClick={handleInviteByEmail}
                  type="button"
                >
                  Select
                </button>

              </div>

              

              <div className="add-planner-option-card">

                <div className="option-icon">
                  👤
                </div>

                <h3>
                  Add Directly
                </h3>

                <p>
                  Create a planner profile manually.
                </p>

                <button
                  className="option-select-btn"
                  onClick={handleAddDirectly}
                  type="button"
                >
                  Select
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ==================================================
          ADD EVENT PLANNER DIRECTLY
      ================================================== */}

      {showDirectAddModal && (
        <div className="planner-modal-overlay">

          <div className="direct-add-planner-modal">

            <button
              className="planner-modal-close"
              onClick={() => setShowDirectAddModal(false)}
              type="button"
            >
              ×
            </button>

            <EventPlannerForm
              mode="admin"
              onSuccess={() => {
                setShowDirectAddModal(false);
              }}
              onCancel={() => {
                setShowDirectAddModal(false);
              }}
            />

          </div>

        </div>
      )}

      {/* ==================================================
          INVITE BY EMAIL MODAL
      ================================================== */}

      {showInviteModal && (
        <div className="planner-modal-overlay">

          <div className="invite-planner-modal">

            <button
              className="planner-modal-close"
              onClick={() => setShowInviteModal(false)}
              type="button"
            >
              ×
            </button>

            <div className="invite-modal-header">

              <h2>
                Invite Event Planner
              </h2>

              <p>
                Send an invitation to the event
                planner's email address.
              </p>

            </div>

            {error && (
              <div className="planner-error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSendInvitation}>

              <div className="planner-form-group">

                <label>
                  Email Address
                  <span>*</span>
                </label>

                <input
                  type="email"
                  placeholder="Enter planner email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />

              </div>

              <div className="invite-modal-actions">

                <button
                  type="button"
                  className="planner-cancel-btn"
                  onClick={() => setShowInviteModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="planner-submit-btn"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Invitation"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default EventPlannerManagement;