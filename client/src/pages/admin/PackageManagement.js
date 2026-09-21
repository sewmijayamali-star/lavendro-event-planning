import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Inventory2,
  Add,
  Edit,
  Delete,
  Search,
} from "@mui/icons-material";

import "../../styles/admin/packageManagement.css";

const PackageManagement = () => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
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
        return;
      }
    } catch (error) {
      console.error("User data error:", error);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/packages`
      );

      setPackages(response.data.packages || []);
    } catch (error) {
      console.error("Get packages error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load packages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="package-management-page">

      {/* ================= HEADER ================= */}

      <div className="package-page-header">

        <div className="package-header-content">

          <div className="package-header-icon">
            <Inventory2 />
          </div>

          <div>
            <p className="package-header-label">
              SERVICE MANAGEMENT
            </p>

            <h1>Packages</h1>

            <p>
              Manage the event packages offered by Lavendro.
            </p>
          </div>

        </div>

        <button
          className="package-add-button"
          onClick={() => {
            // We will add the form next
          }}
        >
          <Add />
          Add Package
        </button>

      </div>


      {/* ================= ERROR ================= */}

      {error && (
        <div className="package-error-message">
          {error}
        </div>
      )}


      {/* ================= TOOLBAR ================= */}

      <div className="package-toolbar">

        <div className="package-search">

          <Search />

          <input
            type="text"
            placeholder="Search packages..."
          />

        </div>

        <div className="package-count">
          {packages.length} Packages
        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="package-management-card">

        {loading ? (

          <div className="package-loading">
            <div className="package-spinner"></div>
            <p>Loading packages...</p>
          </div>

        ) : packages.length === 0 ? (

          <div className="package-empty">

            <div className="package-empty-icon">
              <Inventory2 />
            </div>

            <h2>No Packages Yet</h2>

            <p>
              Add your first event package to the Lavendro system.
            </p>

            <button
              className="package-empty-button"
              onClick={() => {
                // We will add the form next
              }}
            >
              <Add />
              Add Package
            </button>

          </div>

        ) : (

          <div className="package-table-wrapper">

            <table className="package-table">

              <thead>
                <tr>
                  <th>PACKAGE</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>DURATION</th>
                  <th>GUESTS</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {packages.map((packageItem) => (

                  <tr key={packageItem._id}>

                    <td>

                      <div className="package-name-cell">

                        {packageItem.image ? (
                          <img
                            src={packageItem.image}
                            alt={packageItem.name}
                            className="package-image"
                          />
                        ) : (
                          <div className="package-image-placeholder">
                            <Inventory2 />
                          </div>
                        )}

                        <div>
                          <strong>
                            {packageItem.name}
                          </strong>

                          <span>
                            {packageItem.description}
                          </span>
                        </div>

                      </div>

                    </td>

                    <td>
                      {packageItem.category}
                    </td>

                    <td>
                      Rs.{" "}
                      {Number(packageItem.price).toLocaleString()}
                    </td>

                    <td>
                      {packageItem.duration}
                    </td>

                    <td>
                      {packageItem.guests}
                    </td>

                    <td>

                      <span
                        className={
                          packageItem.isActive
                            ? "package-status active"
                            : "package-status inactive"
                        }
                      >
                        <span className="package-status-dot"></span>

                        {packageItem.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    <td>

                      <div className="package-actions">

                        <button
                          type="button"
                          className="package-edit-button"
                          title="Edit package"
                        >
                          <Edit />
                        </button>

                        <button
                          type="button"
                          className="package-delete-button"
                          title="Delete package"
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

    </div>
  );
};

export default PackageManagement;