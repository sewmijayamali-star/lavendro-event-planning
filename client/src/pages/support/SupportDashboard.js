import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Dashboard,
  SupportAgent,
  Chat,
  CheckCircle,
  AccessTime,
  Search,
  Logout,
  Person,
  Email,
  Circle,
} from "@mui/icons-material";

import "../../styles/support/supportDashboard.css";

const SupportDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD LOGGED-IN SUPPORT USER
  // ==========================================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.role !== "support") {
        navigate("/");
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      navigate("/login");
    }
  }, [navigate]);


  // ==========================================
  // LOAD SUPPORT CONVERSATIONS
  // ==========================================
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/support/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setConversations(
          response.data.conversations || []
        );

      } catch (error) {
        console.error(
          "Failed to load conversations:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to load support conversations."
        );
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.role === "support") {
          fetchConversations();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);


  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  // ==========================================
  // OPEN CONVERSATION
  // ==========================================
  const openConversation = (conversationId) => {
    navigate(
      `/support/dashboard/chat/${conversationId}`
    );
  };


  // ==========================================
  // STATISTICS
  // ==========================================

  const openConversations = conversations.filter(
    (conversation) =>
      conversation.status === "open"
  ).length;

  const assignedToMe = conversations.filter(
    (conversation) =>
      conversation.assignedSupport?._id === user?.id
  ).length;

  const unassignedConversations =
    conversations.filter(
      (conversation) =>
        !conversation.assignedSupport
    ).length;


  return (
    <div className="support-dashboard">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className="support-sidebar">

        <div className="support-brand">

          <div className="support-brand-mark">
            L
          </div>

          <div>
            <h2>Lavendro</h2>
            <span>Support Center</span>
          </div>

        </div>


        <div className="support-menu-title">
          SUPPORT
        </div>


        <nav className="support-nav">

          <button
            className="support-nav-item active"
          >
            <Dashboard />
            <span>Dashboard</span>
          </button>

          <button
            className="support-nav-item"
          >
            <Chat />
            <span>Conversations</span>

            {openConversations > 0 && (
              <span className="nav-count">
                {openConversations}
              </span>
            )}
          </button>

        </nav>


        <div className="support-sidebar-bottom">

          <button
            className="support-nav-item logout"
            onClick={handleLogout}
          >
            <Logout />
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="support-main">

        {/* TOP BAR */}

        <header className="support-topbar">

          <div className="support-page-title">

            <span>SUPPORT CENTER</span>

            <h1>Support Dashboard</h1>

          </div>


          <div className="support-user">

            <div className="support-online-indicator">
              <Circle />
            </div>

            <div className="support-user-avatar">
              {user?.fullName?.charAt(0)?.toUpperCase() ||
                user?.name?.charAt(0)?.toUpperCase() ||
                "S"}
            </div>

            <div className="support-user-info">

              <strong>
                {user?.fullName ||
                  user?.name ||
                  "Support Staff"}
              </strong>

              <span>
                Support Staff
              </span>

            </div>

          </div>

        </header>


        {/* WELCOME */}

        <section className="support-welcome">

          <div>

            <p>WELCOME BACK 👋</p>

            <h2>
              Hello,{" "}
              {user?.fullName ||
                user?.name ||
                "Support Staff"}
            </h2>

            <span>
              Manage customer conversations and
              provide support from one place.
            </span>

          </div>

          <div className="support-welcome-icon">
            <SupportAgent />
          </div>

        </section>


        {/* STATISTICS */}

        <section className="support-stats-grid">

          <div className="support-stat-card">

            <div className="support-stat-icon">
              <Chat />
            </div>

            <div>
              <span>Open Conversations</span>
              <strong>
                {openConversations}
              </strong>
            </div>

          </div>


          <div className="support-stat-card">

            <div className="support-stat-icon">
              <Person />
            </div>

            <div>
              <span>Assigned to Me</span>
              <strong>
                {assignedToMe}
              </strong>
            </div>

          </div>


          <div className="support-stat-card">

            <div className="support-stat-icon">
              <AccessTime />
            </div>

            <div>
              <span>Waiting for Support</span>
              <strong>
                {unassignedConversations}
              </strong>
            </div>

          </div>


          <div className="support-stat-card">

            <div className="support-stat-icon">
              <CheckCircle />
            </div>

            <div>
              <span>Resolved Today</span>
              <strong>0</strong>
            </div>

          </div>

        </section>


        {/* CONVERSATIONS */}

        <section className="support-conversations-panel">

          <div className="support-panel-header">

            <div>
              <h3>Customer Conversations</h3>

              <p>
                Manage and respond to customer
                support requests.
              </p>
            </div>


            <div className="support-search">

              <Search />

              <input
                type="text"
                placeholder="Search conversations..."
              />

            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="support-error">
              {error}
            </div>
          )}


          {/* LOADING */}

          {loading ? (
            <div className="support-empty-state">
              <div className="support-loader"></div>

              <p>
                Loading conversations...
              </p>
            </div>
          ) : conversations.length === 0 ? (

            /* EMPTY */

            <div className="support-empty-state">

              <Chat />

              <h3>
                No open conversations
              </h3>

              <p>
                Customer conversations will appear
                here when they contact support.
              </p>

            </div>

          ) : (

            /* CONVERSATION LIST */

            <div className="support-conversation-list">

              {conversations.map(
                (conversation) => (

                  <div
                    key={conversation._id}
                    className="support-conversation-row"
                    onClick={() =>
                      openConversation(
                        conversation._id
                      )
                    }
                  >

                    <div className="customer-avatar">

                      {conversation.customer?.fullName
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}

                    </div>


                    <div className="conversation-customer">

                      <strong>
                        {conversation.customer
                          ?.fullName ||
                          "Unknown Customer"}
                      </strong>

                      <span>
                        <Email />
                        {conversation.customer
                          ?.email ||
                          "No email"}
                      </span>

                    </div>


                    <div className="conversation-message">

                      <strong>
                        {conversation.lastMessage ||
                          "No messages yet"}
                      </strong>

                      <span>
                        {conversation.lastMessageAt
                          ? new Date(
                              conversation.lastMessageAt
                            ).toLocaleString()
                          : "No activity"}
                      </span>

                    </div>


                    <div className="conversation-assignment">

                      {conversation.assignedSupport ? (
                        <span className="assigned">
                          Assigned
                        </span>
                      ) : (
                        <span className="unassigned">
                          Unassigned
                        </span>
                      )}

                    </div>


                    <div className="conversation-arrow">
                      →
                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
};

export default SupportDashboard;