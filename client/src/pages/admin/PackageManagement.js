import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PackageForm from "../../components/PackageForm";

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

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

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
  // GET ALL PACKAGES
  // ==========================================
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

  // ==========================================
  // LOAD PACKAGES
  // ==========================================
  useEffect(() => {
    fetchPackages();
  }, []);

  // ==========================================
  // ADD PACKAGE SUCCESS
  // ==========================================
  const handleAddPackageSuccess = async () => {
    setShowAddModal(false);
    await fetchPackages();
  };

  // ==========================================
  // OPEN EDIT PACKAGE
  // ==========================================
  const handleEditPackage = (packageItem) => {
    setError("");
    setEditingPackage(packageItem);
  };

  // ==========================================
  // EDIT PACKAGE SUCCESS
  // ==========================================
  const handleEditPackageSuccess = async () => {
    setEditingPackage(null);
    await fetchPackages();
  };

  // ==========================================
  // DELETE PACKAGE
  // ==========================================
  const handleDeletePackage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/packages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchPackages();
    } catch (error) {
      console.error("Delete package error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete package."
      );
    }
  };

  // ==========================================
  // CLOSE EDIT MODAL
  // ==========================================
  const handleCloseEditModal = () => {
    setEditingPackage(null);
  };

  return (
    <div className="package-management-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

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

        {/* ADD PACKAGE BUTTON */}

        <button
          type="button"
          className="package-add-button"
          onClick={() => {
            setError("");
            setShowAddModal(true);
          }}
        >
          <Add />
          Add Package
        </button>

      </div>

      {/* =========================================
          ERROR MESSAGE
      ========================================= */}

      {error && (
        <div className="package-error-message">
          {error}
        </div>
      )}

      {/* =========================================
          TOOLBAR
      ========================================= */}

      <div className="package-toolbar">

        <div className="package-search">

          <Search />

          <input
            type="text"
            placeholder="Search packages..."
          />

        </div>

        <div className="package-count">
          {packages.length}{" "}
          {packages.length === 1
            ? "Package"
            : "Packages"}
        </div>

      </div>

      {/* =========================================
          PACKAGE CONTENT
      ========================================= */}

      <div className="package-management-card">

        {loading ? (

          /* LOADING */

          <div className="package-loading">

            <div className="package-spinner"></div>

            <p>
              Loading packages...
            </p>

          </div>

        ) : packages.length === 0 ? (

          /* EMPTY STATE */

          <div className="package-empty">

            <div className="package-empty-icon">
              <Inventory2 />
            </div>

            <h2>
              No Packages Yet
            </h2>

            <p>
              Add your first event package to the
              Lavendro system.
            </p>

            <button
              type="button"
              className="package-empty-button"
              onClick={() => {
                setError("");
                setShowAddModal(true);
              }}
            >
              <Add />
              Add Package
            </button>

          </div>

        ) : (

          /* PACKAGE TABLE */

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

                    {/* PACKAGE */}

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

                    {/* CATEGORY */}

                    <td>
                      {packageItem.category}
                    </td>

                    {/* PRICE */}

                    <td>
                      Rs.{" "}
                      {Number(
                        packageItem.price
                      ).toLocaleString()}
                    </td>

                    {/* DURATION */}

                    <td>
                      {packageItem.duration}
                    </td>

                    {/* GUESTS */}

                    <td>
                      {packageItem.guests}
                    </td>

                    {/* STATUS */}

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

                    {/* ACTIONS */}

                    <td>

                      <div className="package-actions">

                        {/* EDIT */}

                        <button
                          type="button"
                          className="package-edit-button"
                          title="Edit package"
                          onClick={() =>
                            handleEditPackage(packageItem)
                          }
                        >
                          <Edit />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="package-delete-button"
                          title="Delete package"
                          onClick={() =>
                            handleDeletePackage(
                              packageItem._id
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
          ADD PACKAGE MODAL
      ========================================= */}

      {showAddModal && (

        <div className="package-modal-overlay">

          <div className="package-modal">

            <PackageForm
              onSuccess={handleAddPackageSuccess}
              onCancel={() =>
                setShowAddModal(false)
              }
            />

          </div>

        </div>

      )}

      {/* =========================================
          EDIT PACKAGE MODAL
      ========================================= */}

      {editingPackage && (

        <div className="package-modal-overlay">

          <div className="package-modal">

            <PackageForm
              packageData={editingPackage}
              onSuccess={handleEditPackageSuccess}
              onCancel={handleCloseEditModal}
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default PackageManagement;