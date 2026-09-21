import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuForm from "../../components/MenuForm";

import {
  RestaurantMenu,
  Edit,
  Delete,
  Add,
  Search,
} from "@mui/icons-material";

import "../../styles/admin/menuManagement.css";

const MenuManagement = () => {
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);


  const handleAddMenuSuccess = async () => {
  setShowAddModal(false);
  await fetchMenus();
};

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
  // GET ALL MENUS
  // ==========================================
  const fetchMenus = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/menus`
      );

      setMenus(response.data.menus || []);
    } catch (error) {
      console.error("Get menus error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load menus."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD MENUS WHEN PAGE OPENS
  // ==========================================
  useEffect(() => {
    fetchMenus();
  }, []);

  // ==========================================
  // DELETE MENU
  // ==========================================
  const handleDeleteMenu = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this menu?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/menus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchMenus();
    } catch (error) {
      console.error("Delete menu error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete menu."
      );
    }
  };

  // ==========================================
  // EDIT MENU
  // ==========================================
  const handleEditMenu = (menu) => {
  setError("");
  setEditingMenu(menu);
};
const handleEditMenuSuccess = async () => {
  setEditingMenu(null);
  await fetchMenus();
};
  return (
    <div className="menu-management-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="menu-page-header">

        <div className="menu-header-content">

          <div className="menu-header-icon">
            <RestaurantMenu />
          </div>

          <div>

            <p className="menu-header-label">
              SERVICE MANAGEMENT
            </p>

            <h1>Menus</h1>

            <p>
              Manage the food menus offered by Lavendro.
            </p>

          </div>

        </div>

        {/* ADD MENU BUTTON */}

        <button
          type="button"
          className="menu-add-button"
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          <Add />
          Add Menu
        </button>

      </div>

      {/* =========================================
          ERROR MESSAGE
      ========================================= */}

      {error && (
        <div className="menu-error-message">
          {error}
        </div>
      )}

      {/* =========================================
          TOOLBAR
      ========================================= */}

      <div className="menu-toolbar">

        <div className="menu-search">

          <Search />

          <input
            type="text"
            placeholder="Search menus..."
          />

        </div>

        <div className="menu-count">
          {menus.length}{" "}
          {menus.length === 1
            ? "Menu"
            : "Menus"}
        </div>

      </div>

      {/* =========================================
          MENU CONTENT
      ========================================= */}

      <div className="menu-management-card">

        {loading ? (

          /* LOADING */

          <div className="menu-loading">

            <div className="menu-spinner"></div>

            <p>
              Loading menus...
            </p>

          </div>

        ) : menus.length === 0 ? (

          /* EMPTY STATE */

          <div className="menu-empty">

            <div className="menu-empty-icon">
              <RestaurantMenu />
            </div>

            <h2>
              No Menus Yet
            </h2>

            <p>
              No food menus have been added to
              the Lavendro system yet.
            </p>

            <button
              type="button"
              className="menu-empty-button"
              onClick={() => {
                console.log("Add menu");
              }}
            >
              <Add />
              Add Menu
            </button>

          </div>

        ) : (

          /* MENU TABLE */

          <div className="menu-table-wrapper">

            <table className="menu-table">

              <thead>

                <tr>

                  <th>MENU</th>
                  <th>CATEGORY</th>
                  <th>PRICE / PERSON</th>
                  <th>ITEMS</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>

                </tr>

              </thead>

              <tbody>

                {menus.map((menu) => (

                  <tr key={menu._id}>

                    {/* MENU */}

                    <td>

                      <div className="menu-name-cell">

                        {menu.image ? (

                          <img
                            src={menu.image}
                            alt={menu.name}
                            className="menu-image"
                          />

                        ) : (

                          <div className="menu-image-placeholder">
                            <RestaurantMenu />
                          </div>

                        )}

                        <div>

                          <strong>
                            {menu.name}
                          </strong>

                          <span>
                            {menu.description}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* CATEGORY */}

                    <td>
                      {menu.category}
                    </td>

                    {/* PRICE */}

                    <td>
                      Rs.{" "}
                      {Number(
                        menu.pricePerPerson
                      ).toLocaleString()}
                    </td>

                    {/* ITEMS */}

                    <td>

                      <div className="menu-items-cell">

                        {Array.isArray(menu.items)
                          ? menu.items.length
                          : 0}{" "}
                        Items

                      </div>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={
                          menu.isActive
                            ? "menu-status active"
                            : "menu-status inactive"
                        }
                      >

                        <span className="menu-status-dot"></span>

                        {menu.isActive
                          ? "Active"
                          : "Inactive"}

                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="menu-actions">

                        {/* EDIT */}

                        <button
                          type="button"
                          className="menu-edit-button"
                          title="Edit menu"
                          onClick={() =>
                            handleEditMenu(menu)
                          }
                        >
                          <Edit />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="menu-delete-button"
                          title="Delete menu"
                          onClick={() =>
                            handleDeleteMenu(
                              menu._id
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

      {showAddModal && (
  <div className="menu-modal-overlay">

    <div className="menu-modal">

      <MenuForm
        onSuccess={handleAddMenuSuccess}
        onCancel={() => setShowAddModal(false)}
      />

    </div>

  </div>
)}

{editingMenu && (
  <div className="menu-modal-overlay">
    <div className="menu-modal">

      <MenuForm
        menuData={editingMenu}
        onSuccess={handleEditMenuSuccess}
        onCancel={() => setEditingMenu(null)}
      />

    </div>
  </div>
)}

    </div>
  );
};

export default MenuManagement;