import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Dashboard,
  People,
  Event,
  Inventory2,
  RestaurantMenu,
  LocationOn,
  SupportAgent,
  CalendarMonth,
  Message,
  Settings,
  Logout,
  NotificationsNone,
  Search,
  TrendingUp,
  AttachMoney,
  EventAvailable,
  PendingActions,
} from "@mui/icons-material";

import "../../styles/admin/adminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

 
  return (
    <div className="admin-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        {/* Logo */}
        <div className="admin-logo">
          <div className="logo-mark">L</div>

          <div className="logo-text">
            <h2>Lavendro</h2>
            <span>Event Planning</span>
          </div>
        </div>

        {/* Main Menu */}
        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="admin-nav">

          <a
            href="/admin/dashboard"
            className="admin-nav-item active"
          >
            <Dashboard />
            <span>Dashboard</span>
          </a>

          <a href="#events" className="admin-nav-item">
            <Event />
            <span>Events</span>
          </a>

          <a href="#bookings" className="admin-nav-item">
            <EventAvailable />
            <span>Bookings</span>
          </a>

          <a href="/admin/packages" className="admin-nav-item">
            <Inventory2 />
            <span>Packages</span>
          </a>

          <a href="#menus" className="admin-nav-item">
            <RestaurantMenu />
            <span>Menus</span>
          </a>

          <a href="#venues" className="admin-nav-item">
            <LocationOn />
            <span>Venues</span>
          </a>

        </nav>

        {/* Management */}
        <div className="sidebar-section-title management-title">
          MANAGEMENT
        </div>

        <nav className="admin-nav">

          <a href="#users" className="admin-nav-item">
            <People />
            <span>Users</span>
          </a>

          <a href="#support" className="admin-nav-item">
            <SupportAgent />
            <span>Support Staff</span>
          </a>

          <a href="/admin/event-planners" className="admin-nav-item">
            <CalendarMonth />
            <span>Event Planners</span>
          </a>

          <a href="#inquiries" className="admin-nav-item">
            <Message />
            <span>Inquiries</span>
          </a>

        </nav>

        {/* Bottom */}
        <div className="sidebar-bottom">

          <button className="admin-nav-item">
            <Settings />
            <span>Settings</span>
          </button>

          <button
            className="admin-nav-item logout-button"
            onClick={handleLogout}
          >
            <Logout />
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="admin-main">

        {/* ================= TOP BAR ================= */}

        <header className="admin-topbar">

          <div className="admin-search">
            <Search />

            <input
              type="text"
              placeholder="Search events, bookings, users..."
            />
          </div>

          <div className="admin-top-actions">

            <button className="notification-button">
              <NotificationsNone />
              <span className="notification-dot"></span>
            </button>

            <div className="admin-profile">

              <div className="admin-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <div className="admin-profile-info">
                <strong>
                  {user?.name || "Administrator"}
                </strong>

                <span>Administrator</span>
              </div>

            </div>

          </div>

        </header>


        {/* ================= PAGE HEADER ================= */}

        <section className="admin-page-header">

          <div>

            <p className="welcome-label">
              WELCOME BACK 👋
            </p>

            <h1>Admin Dashboard</h1>

            <p>
              Manage your events, customers, services and
              Lavendro team from one place.
            </p>

          </div>

          <button className="primary-action">
            <Event />
            Create Event
          </button>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">

          {/* Total Events */}
          <div className="stat-card">

            <div className="stat-icon">
              <EventAvailable />
            </div>

            <div className="stat-content">

              <span>Total Events</span>

              <h2>128</h2>

              <small className="positive">
                <TrendingUp />
                12.5% this month
              </small>

            </div>

          </div>


          {/* Upcoming Events */}
          <div className="stat-card">

            <div className="stat-icon">
              <CalendarMonth />
            </div>

            <div className="stat-content">

              <span>Upcoming Events</span>

              <h2>24</h2>

              <small>
                Next 30 days
              </small>

            </div>

          </div>


          {/* Customers */}
          <div className="stat-card">

            <div className="stat-icon">
              <People />
            </div>

            <div className="stat-content">

              <span>Total Customers</span>

              <h2>842</h2>

              <small className="positive">
                <TrendingUp />
                8.2% this month
              </small>

            </div>

          </div>


          {/* Revenue */}
          <div className="stat-card">

            <div className="stat-icon">
              <AttachMoney />
            </div>

            <div className="stat-content">

              <span>Total Revenue</span>

              <h2>Rs. 2.4M</h2>

              <small className="positive">
                <TrendingUp />
                15.8% this month
              </small>

            </div>

          </div>

        </section>


        {/* ================= MAIN CONTENT GRID ================= */}

        <section className="dashboard-content-grid">

          {/* Recent Bookings */}

          <div className="dashboard-panel bookings-panel">

            <div className="panel-header">

              <div>
                <h3>Recent Bookings</h3>

                <p>
                  Latest event bookings from customers
                </p>
              </div>

              <button className="view-all">
                View All
              </button>

            </div>


            <div className="booking-list">

              {/* Booking 1 */}

              <div className="booking-row">

                <div className="booking-event-icon">
                  <Event />
                </div>

                <div className="booking-details">

                  <strong>
                    Sarah & John's Wedding
                  </strong>

                  <span>
                    Wedding Package • 150 guests
                  </span>

                </div>

                <div className="booking-date">

                  <strong>Sep 28</strong>

                  <span>2026</span>

                </div>

                <span className="status confirmed">
                  Confirmed
                </span>

              </div>


              {/* Booking 2 */}

              <div className="booking-row">

                <div className="booking-event-icon">
                  <Event />
                </div>

                <div className="booking-details">

                  <strong>
                    Tech Conference 2026
                  </strong>

                  <span>
                    Corporate Package • 300 guests
                  </span>

                </div>

                <div className="booking-date">

                  <strong>Oct 04</strong>

                  <span>2026</span>

                </div>

                <span className="status pending">
                  Pending
                </span>

              </div>


              {/* Booking 3 */}

              <div className="booking-row">

                <div className="booking-event-icon">
                  <Event />
                </div>

                <div className="booking-details">

                  <strong>
                    Emma's Birthday
                  </strong>

                  <span>
                    Birthday Package • 80 guests
                  </span>

                </div>

                <div className="booking-date">

                  <strong>Oct 12</strong>

                  <span>2026</span>

                </div>

                <span className="status confirmed">
                  Confirmed
                </span>

              </div>


              {/* Booking 4 */}

              <div className="booking-row">

                <div className="booking-event-icon">
                  <Event />
                </div>

                <div className="booking-details">

                  <strong>
                    Company Annual Dinner
                  </strong>

                  <span>
                    Corporate Package • 200 guests
                  </span>

                </div>

                <div className="booking-date">

                  <strong>Oct 19</strong>

                  <span>2026</span>

                </div>

                <span className="status pending">
                  Pending
                </span>

              </div>

            </div>

          </div>


          {/* Quick Actions */}

          <div className="dashboard-panel quick-actions-panel">

            <div className="panel-header">

              <div>

                <h3>Quick Actions</h3>

                <p>
                  Frequently used tools
                </p>

              </div>

            </div>


            <div className="quick-actions">

              <button
  onClick={() => navigate("/admin/packages")}
>
  <div className="quick-icon">
    <Inventory2 />
  </div>

  <span>Add Package</span>
</button>

              <button>
                <div className="quick-icon">
                  <RestaurantMenu />
                </div>

                <span>Add Menu</span>
              </button>


              <button>
                <div className="quick-icon">
                  <LocationOn />
                </div>

                <span>Add Venue</span>
              </button>


              <button>
                <div className="quick-icon">
                  <People />
                </div>

                <span>Manage Users</span>
              </button>


              <button
  className="admin-nav-item"
  onClick={() => navigate("/admin/support-staff")}
>
  <SupportAgent />
  <span>Support Staff</span>
</button>


              <button>
                <div className="quick-icon">
                  <CalendarMonth />
                </div>
                <a href="/admin/event-planners" className="admin-nav-item">
                  <span>Event Planners</span>
                </a>
              </button>

            </div>

          </div>

        </section>


        {/* ================= BOTTOM GRID ================= */}

        <section className="bottom-grid">

          {/* Support Overview */}

          <div className="dashboard-panel support-overview">

            <div className="panel-header">

              <div>

                <h3>Support Overview</h3>

                <p>
                  Customer support activity
                </p>

              </div>

              <SupportAgent className="panel-title-icon" />

            </div>


            <div className="support-stats">

              <div>

                <span>Open Conversations</span>

                <strong>12</strong>

              </div>


              <div>

                <span>Waiting for Reply</span>

                <strong>5</strong>

              </div>


              <div>

                <span>Resolved Today</span>

                <strong>28</strong>

              </div>

            </div>


            <button className="panel-action">
              Open Support Management
            </button>

          </div>


          {/* Recent Activity */}

          <div className="dashboard-panel activity-panel">

            <div className="panel-header">

              <div>

                <h3>Recent Activity</h3>

                <p>
                  Latest system activity
                </p>

              </div>

              <PendingActions className="panel-title-icon" />

            </div>


            <div className="activity-list">

              <div className="activity-item">

                <span className="activity-dot"></span>

                <p>
                  New booking received
                  <small>10 minutes ago</small>
                </p>

              </div>


              <div className="activity-item">

                <span className="activity-dot"></span>

                <p>
                  New customer registered
                  <small>35 minutes ago</small>
                </p>

              </div>


              <div className="activity-item">

                <span className="activity-dot"></span>

                <p>
                  Package updated
                  <small>1 hour ago</small>
                </p>

              </div>


              <div className="activity-item">

                <span className="activity-dot"></span>

                <p>
                  Support conversation closed
                  <small>2 hours ago</small>
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

export default AdminDashboard;