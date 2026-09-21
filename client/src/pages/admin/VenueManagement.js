import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  LocationOn,
  Edit,
  Delete,
  Add,
  Search,
} from "@mui/icons-material";

import VenueForm from "../../components/VenueForm";

import "../../styles/admin/venueManagement.css";

const VenueManagement = () => {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

  // ==========================================
  // CHECK ADMIN AUTHENTICATION
  // ==========================================

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
      localStorage.removeItem("token");

      navigate("/login");
    }
  }, [navigate]);

  // ==========================================
  // GET ALL VENUES
  // ==========================================

  const fetchVenues = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/venues`
      );

      setVenues(response.data.venues || []);
    } catch (error) {
      console.error("Get venues error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load venues."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD VENUES
  // ==========================================

  useEffect(() => {
    fetchVenues();
  }, []);

  // ==========================================
  // ADD VENUE SUCCESS
  // ==========================================

  const handleAddVenueSuccess = async () => {
    setShowAddModal(false);
    await fetchVenues();
  };

  // ==========================================
  // EDIT VENUE
  // ==========================================

  const handleEditVenue = (venue) => {
    setError("");
    setEditingVenue(venue);
  };

  // ==========================================
  // EDIT SUCCESS
  // ==========================================

  const handleEditVenueSuccess = async () => {
    setEditingVenue(null);
    await fetchVenues();
  };

  // ==========================================
  // DELETE VENUE
  // ==========================================

  const handleDeleteVenue = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/venues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchVenues();
    } catch (error) {
      console.error("Delete venue error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete venue."
      );
    }
  };

  return (
    <div className="venue-management-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="venue-page-header">

        <div className="venue-header-content">

          <div className="venue-header-icon">
            <LocationOn />
          </div>

          <div>

            <p className="venue-header-label">
              SERVICE MANAGEMENT
            </p>

            <h1>Venues</h1>

            <p>
              Manage the event venues offered by Lavendro.
            </p>

          </div>

        </div>

        {/* ADD VENUE */}

        <button
          type="button"
          className="venue-add-button"
          onClick={() => {
            setError("");
            setShowAddModal(true);
          }}
        >
          <Add />
          Add Venue
        </button>

      </div>

      {/* =========================================
          ERROR
      ========================================= */}

      {error && (
        <div className="venue-error-message">
          {error}
        </div>
      )}

      {/* =========================================
          TOOLBAR
      ========================================= */}

      <div className="venue-toolbar">

        <div className="venue-search">

          <Search />

          <input
            type="text"
            placeholder="Search venues..."
          />

        </div>

        <div className="venue-count">

          {venues.length}{" "}
          {venues.length === 1
            ? "Venue"
            : "Venues"}

        </div>

      </div>

      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="venue-management-card">

        {loading ? (

          /* LOADING */

          <div className="venue-loading">

            <div className="venue-spinner"></div>

            <p>
              Loading venues...
            </p>

          </div>

        ) : venues.length === 0 ? (

          /* EMPTY */

          <div className="venue-empty">

            <div className="venue-empty-icon">
              <LocationOn />
            </div>

            <h2>
              No Venues Yet
            </h2>

            <p>
              Add your first event venue to the
              Lavendro system.
            </p>

            <button
              type="button"
              className="venue-empty-button"
              onClick={() => {
                setError("");
                setShowAddModal(true);
              }}
            >
              <Add />
              Add Venue
            </button>

          </div>

        ) : (

          /* TABLE */

          <div className="venue-table-wrapper">

            <table className="venue-table">

              <thead>

                <tr>

                  <th>VENUE</th>
                  <th>LOCATION</th>
                  <th>CAPACITY</th>
                  <th>PRICE / DAY</th>
                  <th>AMENITIES</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>

                </tr>

              </thead>

              <tbody>

                {venues.map((venue) => (

                  <tr key={venue._id}>

                    {/* VENUE */}

                    <td>

                      <div className="venue-name-cell">

                        {venue.image ? (

                          <img
                            src={venue.image}
                            alt={venue.name}
                            className="venue-image"
                          />

                        ) : (

                          <div className="venue-image-placeholder">
                            <LocationOn />
                          </div>

                        )}

                        <div>

                          <strong>
                            {venue.name}
                          </strong>

                          <span>
                            {venue.description}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* LOCATION */}

                    <td>

                      <div className="venue-location-cell">

                        <LocationOn />

                        <span>
                          {venue.location}
                        </span>

                      </div>

                    </td>

                    {/* CAPACITY */}

                    <td>
                      {Number(
                        venue.capacity
                      ).toLocaleString()}{" "}
                      Guests
                    </td>

                    {/* PRICE */}

                    <td>

                      Rs.{" "}
                      {Number(
                        venue.pricePerDay
                      ).toLocaleString()}

                    </td>

                    {/* AMENITIES */}

                    <td>

                      <div className="venue-amenities-cell">

                        {Array.isArray(
                          venue.amenities
                        )
                          ? venue.amenities.length
                          : 0}{" "}
                        Amenities

                      </div>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          venue.isActive
                            ? "venue-status active"
                            : "venue-status inactive"
                        }
                      >

                        <span className="venue-status-dot"></span>

                        {venue.isActive
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="venue-actions">

                        {/* EDIT */}

                        <button
                          type="button"
                          className="venue-edit-button"
                          title="Edit venue"
                          onClick={() =>
                            handleEditVenue(venue)
                          }
                        >
                          <Edit />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="venue-delete-button"
                          title="Delete venue"
                          onClick={() =>
                            handleDeleteVenue(
                              venue._id
                            )
                          }
                        >
                          <Delete />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* =========================================
          ADD VENUE MODAL
      ========================================= */}

      {showAddModal && (

        <div className="venue-modal-overlay">

          <div className="venue-modal">

            <VenueForm
              onSuccess={handleAddVenueSuccess}
              onCancel={() =>
                setShowAddModal(false)
              }
            />

          </div>

        </div>

      )}

      {/* =========================================
          EDIT VENUE MODAL
      ========================================= */}

      {editingVenue && (

        <div className="venue-modal-overlay">

          <div className="venue-modal">

            <VenueForm
              venueData={editingVenue}
              onSuccess={handleEditVenueSuccess}
              onCancel={() =>
                setEditingVenue(null)
              }
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default VenueManagement;