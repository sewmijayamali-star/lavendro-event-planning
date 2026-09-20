import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/eventPlannerManagement.css";
import EventPlannerForm from "../../components/EventPlannerForm";

const EventPlannerManagement = () => {
  const navigate = useNavigate();

  const [eventPlanners, setEventPlanners] = useState([]);

  // Modal states
  const [showAddOptionsModal, setShowAddOptionsModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDirectAddModal, setShowDirectAddModal] = useState(false);

  // Invitation
  const [email, setEmail] = useState("");

  // General states
  const [loading, setLoading] = useState(false);
  const [loadingPlanners, setLoadingPlanners] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // CHECK ADMIN ACCESS
  // =========================================================

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
        return;
      }
    } catch (error) {
      console.error("User data error:", error);

      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  // =========================================================
  // FETCH EVENT PLANNERS
  // =========================================================

  const fetchEventPlanners = async () => {
    try {
      setLoadingPlanners(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/event-planners`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEventPlanners(response.data.eventPlanners || []);
    } catch (error) {
      console.error("Get event planners error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load event planners."
      );
    } finally {
      setLoadingPlanners(false);
    }
  };

  // =========================================================
  // LOAD PLANNERS WHEN PAGE OPENS
  // =========================================================

  useEffect(() => {
    fetchEventPlanners();
  }, []);

  // =========================================================
  // SEND EVENT PLANNER INVITATION
  // =========================================================

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

  // =========================================================
  // DEACTIVATE EVENT PLANNER
  // =========================================================

  const handleDeactivate = async (plannerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this event planner?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/admin/event-planners/${plannerId}/deactivate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Event planner deactivated successfully."
      );

      // Reload planner list
      await fetchEventPlanners();
    } catch (error) {
      console.error(
        "Deactivate event planner error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to deactivate event planner."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CLOSE ADD OPTIONS MODAL
  // =========================================================

  const handleCloseAddOptions = () => {
    setShowAddOptionsModal(false);
  };

  // =========================================================
  // OPEN INVITE MODAL
  // =========================================================

  const handleInviteByEmail = () => {
    setShowAddOptionsModal(false);
    setShowInviteModal(true);

    setMessage("");
    setError("");
  };

  // =========================================================
  // OPEN DIRECT ADD MODAL
  // =========================================================

  const handleAddDirectly = () => {
    setShowAddOptionsModal(false);
    setShowDirectAddModal(true);

    setMessage("");
    setError("");
  };

  // =========================================================
  // HANDLE DIRECT ADD SUCCESS
  // =========================================================

  const handleDirectAddSuccess = async () => {
    setShowDirectAddModal(false);

    setMessage("Event planner created successfully.");
    setError("");

    // Reload the planner list
    await fetchEventPlanners();
  };

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalPlanners = eventPlanners.length;

  const activePlanners = eventPlanners.filter(
    (planner) => planner.isActive
  ).length;

  const inactivePlanners = eventPlanners.filter(
    (planner) => !planner.isActive
  ).length;

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="event-planner-management-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="event-planner-page-header">

        <div>
          <h1>Event Planners</h1>

          <p>
            Manage your Lavendro event planning professionals
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


      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {message && (
        <div className="planner-success-message">
          {message}
        </div>
      )}


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && !showInviteModal && (
        <div className="planner-error-message">
          {error}
        </div>
      )}


      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="planner-statistics">

        {/* Total */}

        <div className="planner-stat-card">

          <div className="planner-stat-number">
            {totalPlanners}
          </div>

          <div className="planner-stat-label">
            TOTAL PLANNERS
          </div>

        </div>


        {/* Active */}

        <div className="planner-stat-card">

          <div className="planner-stat-number">
            {activePlanners}
          </div>

          <div className="planner-stat-label">
            ACTIVE
          </div>

        </div>


        {/* Inactive */}

        <div className="planner-stat-card">

          <div className="planner-stat-number">
            {inactivePlanners}
          </div>

          <div className="planner-stat-label">
            INACTIVE
          </div>

        </div>

      </div>


      {/* =====================================================
          PLANNER PROFILES
      ===================================================== */}

      <div className="event-planner-management-card">

        <div className="management-card-header">

          <div>
            <h2>Planner Profiles</h2>

            <p>
              View and manage your Lavendro planning team.
            </p>
          </div>

        </div>


        {/* Loading */}

        {loadingPlanners ? (

          <div className="planner-loading-state">
            <div className="planner-loading-spinner"></div>
            <p>Loading event planners...</p>
          </div>

        ) : eventPlanners.length === 0 ? (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="empty-planners-state">

            <div className="empty-planner-icon">
              👤
            </div>

            <h3>
              No Event Planners Yet
            </h3>

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

          /* =================================================
             PLANNER CARDS
          ================================================= */

          <div className="event-planners-list">

            {eventPlanners.map((planner) => (

              <div
                className="event-planner-item"
                key={planner._id}
              >

                {/* Planner information */}

                <div className="planner-item-info">

                  {/* Profile Photo */}

                  <div className="planner-photo-wrapper">

                    {planner.profilePhoto ? (

                      <img
                        src={planner.profilePhoto}
                        alt={planner.fullName}
                        className="planner-profile-photo"
                      />

                    ) : (

                      <div className="planner-photo-placeholder">
                        {planner.fullName
                          ?.charAt(0)
                          ?.toUpperCase() || "P"}
                      </div>

                    )}

                  </div>


                  {/* Details */}

                  <div className="planner-profile-details">

                    <strong>
                      {planner.fullName}
                    </strong>

                    <p>
                      {planner.email}
                    </p>


                    {/* Qualifications */}

                    {planner.qualifications?.length > 0 && (

                      <div className="planner-qualifications">

                        {planner.qualifications.map(
                          (qualification, index) => (

                            <span
                              key={index}
                              className="qualification-tag"
                            >
                              {qualification}
                            </span>

                          )
                        )}

                      </div>

                    )}


                    {/* Joined date */}

                    <small className="planner-joined-date">
                      Joined:{" "}
                      {formatDate(planner.createdAt)}
                    </small>

                  </div>

                </div>


                {/* Actions */}

                <div className="planner-item-actions">

                  <span
                    className={
                      planner.isActive
                        ? "planner-status active"
                        : "planner-status inactive"
                    }
                  >
                    {planner.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>


                  {/* Deactivate */}

                  {planner.isActive && (

                    <button
                      type="button"
                      className="deactivate-planner-btn"
                      onClick={() =>
                        handleDeactivate(planner._id)
                      }
                      disabled={loading}
                    >
                      Deactivate
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =====================================================
          DETAILS TABLE
      ===================================================== */}

      {eventPlanners.length > 0 && (

        <div className="planner-details-table-card">

          <div className="details-table-header">

            <h2>Details Table</h2>

          </div>


          <div className="planner-table-wrapper">

            <table className="planner-details-table">

              <thead>

                <tr>

                  <th>
                    NAME
                  </th>

                  <th>
                    EMAIL
                  </th>

                  <th>
                    QUALIFICATIONS
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    CREATED AT
                  </th>

                </tr>

              </thead>


              <tbody>

                {eventPlanners.map((planner) => (

                  <tr key={planner._id}>

                    <td>
                      <div className="table-planner-name">

                        {planner.profilePhoto ? (

                          <img
                            src={planner.profilePhoto}
                            alt={planner.fullName}
                            className="table-planner-photo"
                          />

                        ) : (

                          <div className="table-planner-placeholder">
                            {planner.fullName
                              ?.charAt(0)
                              ?.toUpperCase() || "P"}
                          </div>

                        )}

                        <span>
                          {planner.fullName}
                        </span>

                      </div>
                    </td>


                    <td>
                      {planner.email}
                    </td>


                    <td>

                      {planner.qualifications?.length > 0
                        ? planner.qualifications.join(", ")
                        : "No qualifications added"}

                    </td>


                    <td>

                      <span
                        className={
                          planner.isActive
                            ? "table-status active"
                            : "table-status inactive"
                        }
                      >

                        <span className="status-dot"></span>

                        {planner.isActive
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </td>


                    <td>
                      {formatDate(planner.createdAt)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}


      {/* =====================================================
          ADD EVENT PLANNER OPTIONS MODAL
      ===================================================== */}

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

              <h2>
                Add Event Planner
              </h2>

              <p>
                How would you like to add an event planner?
              </p>

            </div>


            <div className="add-planner-options">


              {/* Invite by Email */}

              <div className="add-planner-option-card">

                <div className="option-icon">
                  📧
                </div>

                <h3>
                  Invite by Email
                </h3>

                <p>
                  Send an invitation to the planner's
                  email address.
                </p>

                <button
                  className="option-select-btn"
                  onClick={handleInviteByEmail}
                  type="button"
                >
                  Select
                </button>

              </div>


              {/* Add Directly */}

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


      {/* =====================================================
          DIRECT ADD EVENT PLANNER MODAL
      ===================================================== */}

      {showDirectAddModal && (

        <div className="planner-modal-overlay">

          <div className="direct-add-planner-modal">

            <button
              className="planner-modal-close"
              onClick={() =>
                setShowDirectAddModal(false)
              }
              type="button"
            >
              ×
            </button>


            <EventPlannerForm
              mode="admin"

              onSuccess={handleDirectAddSuccess}

              onCancel={() =>
                setShowDirectAddModal(false)
              }
            />

          </div>

        </div>

      )}


      {/* =====================================================
          INVITE BY EMAIL MODAL
      ===================================================== */}

      {showInviteModal && (

        <div className="planner-modal-overlay">

          <div className="invite-planner-modal">

            <button
              className="planner-modal-close"
              onClick={() => {
                setShowInviteModal(false);
                setError("");
              }}
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
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={loading}
                />

              </div>


              <div className="invite-modal-actions">

                <button
                  type="button"
                  className="planner-cancel-btn"
                  onClick={() => {
                    setShowInviteModal(false);
                    setError("");
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="planner-submit-btn"
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