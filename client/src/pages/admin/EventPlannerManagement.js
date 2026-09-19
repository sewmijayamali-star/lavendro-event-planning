import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/eventPlannerManagement.css";

const EventPlannerManagement = () => {
  const navigate = useNavigate();

  const [eventPlanners, setEventPlanners] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
          email: email.trim()
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(
        response.data.message ||
          "Event planner invitation sent successfully."
      );

      setEmail("");
      setShowInviteModal(false);

    } catch (error) {
      console.error("Event planner invitation error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to send event planner invitation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-planner-management">

      {/* Header */}
      <div className="event-planner-header">

        <div>
          <h1>Event Planners</h1>
          <p>
            Manage Lavendro event planning professionals
          </p>
        </div>

        <button
          className="add-planner-btn"
          onClick={() => {
            setMessage("");
            setError("");
            setShowInviteModal(true);
          }}
        >
          + Add Event Planner
        </button>

      </div>

      {/* Messages */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Planner List */}
      <div className="event-planner-card">

        <div className="card-header">
          <div>
            <h2>Current Event Planners</h2>
            <p>
              View and manage your event planning team.
            </p>
          </div>
        </div>

        {eventPlanners.length === 0 ? (
          <div className="empty-planner-state">
            <div className="empty-icon">👤</div>

            <h3>No Event Planners Yet</h3>

            <p>
              Add an event planner by sending an invitation.
            </p>

            <button
              onClick={() => setShowInviteModal(true)}
              className="empty-add-btn"
            >
              Add Event Planner
            </button>
          </div>
        ) : (
          <div className="planner-list">

            {eventPlanners.map((planner) => (
              <div
                className="planner-item"
                key={planner._id}
              >
                <div className="planner-info">

                  <div className="planner-avatar">
                    {planner.profilePhoto ? (
                      <img
                        src={planner.profilePhoto}
                        alt={planner.fullName}
                      />
                    ) : (
                      "👤"
                    )}
                  </div>

                  <div>
                    <h3>{planner.fullName}</h3>

                    <p>
                      {planner.qualifications ||
                        "Qualifications not added"}
                    </p>
                  </div>

                </div>

                <div className="planner-actions">
                  <button>View</button>
                  <button className="remove-btn">
                    Remove
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Invitation Modal */}
      {showInviteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowInviteModal(false)}
        >

          <div
            className="invite-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowInviteModal(false)}
            >
              ×
            </button>

            <div className="modal-icon">
              👤
            </div>

            <h2>Add Event Planner</h2>

            <p>
              Send an invitation to a new event planner
              to join Lavendro.
            </p>

            <form onSubmit={handleSendInvitation}>

              <div className="form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="Enter event planner email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowInviteModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="send-invite-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Sending..."
                    : "Send Invitation"}
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