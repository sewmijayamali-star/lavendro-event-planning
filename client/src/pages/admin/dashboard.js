import React from "react";
import "../../styles/admin/adminDashboard.css";

const Icon = ({ children, className = "" }) => (
  <span className={`icon ${className}`}>{children}</span>
);

const navGroups = [
  {
    title: "EVENT MANAGEMENT",
    items: [
      ["▣", "Events"],
      ["♙", "Customers"],
      ["✉", "Inquiries", "5"],
    ],
  },
  {
    title: "SERVICES & CATALOG",
    items: [
      ["◇", "Packages"],
      ["♧", "Menus"],
      ["♢", "Venues"],
    ],
  },
  {
    title: "FINANCE",
    items: [
      ["▤", "Payments"],
      ["▥", "Revenue"],
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      ["♙", "Administrators"],
      ["◷", "Activity Logs"],
      ["⚙", "Settings"],
    ],
  },
];

const stats = [
  {
    icon: "▣",
    title: "Upcoming Events",
    value: "12",
    change: "12.5%",
    description: "from last month",
    type: "coral",
  },
  {
    icon: "✉",
    title: "Pending Inquiries",
    value: "8",
    change: "5 new",
    description: "need your attention",
    type: "purple",
    negative: true,
  },
  {
    icon: "♙",
    title: "Total Customers",
    value: "1,248",
    change: "8.2%",
    description: "from last month",
    type: "purple",
  },
  {
    icon: "▤",
    title: "Monthly Revenue",
    value: "Rs. 842K",
    change: "15.8%",
    description: "from last month",
    type: "coral",
  },
];

const events = [
  {
    day: "02",
    month: "SEP",
    title: "Wedding Ceremony",
    customer: "Nimali Perera",
    guests: "120 guests",
    venue: "Grand Ballroom",
    status: "Confirmed",
  },
  {
    day: "04",
    month: "SEP",
    title: "Birthday Celebration",
    customer: "Kasun Fernando",
    guests: "60 guests",
    venue: "Rose Garden",
    status: "Pending",
  },
  {
    day: "06",
    month: "SEP",
    title: "Corporate Event",
    customer: "ABC Holdings",
    guests: "200 guests",
    venue: "Lavendro Hall",
    status: "Confirmed",
  },
];

const inquiries = [
  ["Nimali Perera", "Wedding", "02 Sep 2026", "New"],
  ["Kasun Fernando", "Birthday", "04 Sep 2026", "Reviewing"],
  ["ABC Holdings", "Corporate", "06 Sep 2026", "Confirmed"],
  ["Dilani Silva", "Engagement", "08 Sep 2026", "New"],
];

const activities = [
  ["New event inquiry received", "Wedding Ceremony • 12 minutes ago", "coral"],
  ["Package updated", "Premium Wedding Package • 1 hour ago", "purple"],
  ["Administrator invitation sent", "New team member • 2 hours ago", "purple"],
  ["Payment received", "Rs. 150,000 • 3 hours ago", "purple"],
];

function AdminDashboard() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-mark">♨</div>
          <div>
            <h2>Lavendro</h2>
            <span>EVENT PLANNING</span>
          </div>
        </div>

        <div className="sidebar-content">

          <div className="sidebar-section-label">OVERVIEW</div>

          <button className="nav-item active">
            <Icon>⌂</Icon>
            <span>Dashboard</span>
          </button>

          {navGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              <div className="sidebar-section-label">
                {group.title}
              </div>

              {group.items.map(([icon, label, badge]) => (
                <button className="nav-item" key={label}>
                  <Icon>{icon}</Icon>
                  <span>{label}</span>

                  {badge && (
                    <span className="nav-badge">{badge}</span>
                  )}
                </button>
              ))}
            </div>
          ))}

        </div>

        <div className="premium-card">
          <div className="premium-icon">♛</div>
          <div>
            <strong>Lavendro Premium</strong>
            <p>Delivering unforgettable moments with elegance.</p>
          </div>
          <button>View Website →</button>
        </div>

      </aside>

      {/* MAIN AREA */}
      <div className="dashboard-area">

        {/* TOP BAR */}
        <header className="topbar">

          <button className="menu-button">☰</button>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search events, customers, inquiries..."
            />
            <kbd>⌘ K</kbd>
          </div>

          <div className="topbar-right">

            <button className="notification">
              ♧
              <span>3</span>
            </button>

            <div className="administrator">
              <div className="avatar">A</div>
              <div>
                <strong>Administrator</strong>
                <small>Super Admin</small>
              </div>
              <span>⌄</span>
            </div>

          </div>

        </header>

        {/* CONTENT */}
        <main className="dashboard-content">

          {/* HEADER */}
          <section className="page-header">

            <div>
              <span className="eyebrow">OVERVIEW</span>

              <h1>
                Good morning, Administrator <span>👋</span>
              </h1>

              <p>
                Here's what's happening with Lavendro today.
              </p>
            </div>

            <button className="date-picker">
              <span>▣</span>
              30 August 2026
              <span>⌄</span>
            </button>

          </section>

          {/* QUICK ACTIONS */}
          <section className="quick-actions">

            <button className="quick-action primary">
              <div className="quick-icon coral-bg">＋</div>
              <div>
                <strong>Create New Event</strong>
                <small>Plan a new event</small>
              </div>
              <span className="arrow">›</span>
            </button>

            <button className="quick-action">
              <div className="quick-icon purple-bg">✉</div>
              <div>
                <strong>View Inquiries</strong>
                <small>5 new inquiries</small>
              </div>
              <span className="arrow">›</span>
            </button>

            <button className="quick-action">
              <div className="quick-icon purple-bg">♙</div>
              <div>
                <strong>Invite Administrator</strong>
                <small>Add team access</small>
              </div>
              <span className="arrow">›</span>
            </button>

          </section>

          {/* STATS */}
          <section className="stats-grid">

            {stats.map((stat) => (
              <div className="stat-card" key={stat.title}>

                <div className={`stat-icon ${stat.type}`}>
                  {stat.icon}
                </div>

                <button className="more-button">⋮</button>

                <div className="stat-title">
                  {stat.title}
                </div>

                <div className="stat-value">
                  {stat.value}
                </div>

                <div className="stat-change-row">
                  <span
                    className={
                      stat.negative
                        ? "change negative"
                        : "change positive"
                    }
                  >
                    {stat.negative ? stat.change : `↗ ${stat.change}`}
                  </span>

                  <span className="change-description">
                    {stat.description}
                  </span>
                </div>

                <div className={`mini-chart ${stat.type}`}>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

              </div>
            ))}

          </section>

          {/* MAIN GRID */}
          <section className="main-grid">

            {/* REVENUE */}
            <div className="panel revenue-panel">

              <div className="panel-header">
                <div>
                  <h3>Revenue Overview</h3>
                  <div className="revenue-number">
                    Rs. 842,000
                  </div>

                  <div className="revenue-meta">
                    <span>↗ 15.8%</span>
                    from last month
                  </div>
                </div>

                <select>
                  <option>Last 6 Months</option>
                  <option>Last 12 Months</option>
                </select>
              </div>

              <div className="chart">

                <div className="chart-y">
                  <span>Rs. 1.2M</span>
                  <span>Rs. 900K</span>
                  <span>Rs. 600K</span>
                  <span>Rs. 300K</span>
                  <span>Rs. 0</span>
                </div>

                <div className="chart-area">

                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>
                  <div className="grid-line"></div>

                  <div className="bars">

                    {[65, 90, 70, 98, 94, 122].map(
                      (height, index) => (
                        <div className="bar-wrapper" key={index}>
                          <div
                            className={`bar ${
                              index === 5 ? "active" : ""
                            }`}
                            style={{ height: `${height}px` }}
                          ></div>
                          <span>
                            {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][
                              index
                            ]}
                          </span>
                        </div>
                      )
                    )}

                  </div>
                </div>

              </div>

            </div>

            {/* EVENTS */}
            <div className="panel events-panel">

              <div className="panel-heading">
                <h3>Upcoming Events</h3>
                <button>View all →</button>
              </div>

              <div className="event-list">

                {events.map((event) => (
                  <div className="event-row" key={event.title}>

                    <div className="event-date">
                      <strong>{event.day}</strong>
                      <span>{event.month}</span>
                    </div>

                    <div className="event-info">
                      <strong>{event.title}</strong>
                      <small>{event.customer}</small>

                      <div>
                        ♙ {event.guests}
                        <span>⌖ {event.venue}</span>
                      </div>
                    </div>

                    <span
                      className={`status ${
                        event.status === "Pending"
                          ? "pending"
                          : "confirmed"
                      }`}
                    >
                      {event.status}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* QUICK ACTION PANEL */}
            <div className="panel action-panel">

              <div className="panel-heading">
                <h3>Quick Actions</h3>
              </div>

              <div className="action-list">

                <button>
                  <div className="action-icon coral-bg">＋</div>
                  <div>
                    <strong>Create New Event</strong>
                    <small>Plan a new event</small>
                  </div>
                  <span>›</span>
                </button>

                <button>
                  <div className="action-icon purple-bg">✉</div>
                  <div>
                    <strong>View Inquiries</strong>
                    <small>5 new inquiries</small>
                  </div>
                  <span>›</span>
                </button>

                <button>
                  <div className="action-icon purple-bg">♙</div>
                  <div>
                    <strong>Invite Administrator</strong>
                    <small>Add team access</small>
                  </div>
                  <span>›</span>
                </button>

              </div>

            </div>

          </section>

          {/* BOTTOM GRID */}
          <section className="bottom-grid">

            {/* INQUIRIES */}
            <div className="panel inquiries-panel">

              <div className="panel-heading">
                <h3>Recent Inquiries</h3>
                <button>View all →</button>
              </div>

              <div className="table-wrapper">

                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Event Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {inquiries.map(
                      ([customer, type, date, status]) => (
                        <tr key={customer}>
                          <td>{customer}</td>
                          <td>{type}</td>
                          <td>{date}</td>
                          <td>
                            <span
                              className={`table-status ${status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {status}
                            </span>
                          </td>
                          <td>
                            <button className="view-button">
                              ◉
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

              </div>

            </div>

            {/* ACTIVITY */}
            <div className="panel activity-panel">

              <div className="panel-heading">
                <h3>Recent Activity</h3>
                <button>View all →</button>
              </div>

              <div className="activity-list">

                {activities.map(
                  ([title, description, type]) => (
                    <div className="activity-item" key={title}>

                      <div
                        className={`activity-dot ${type}`}
                      ></div>

                      <div>
                        <strong>{title}</strong>
                        <small>{description}</small>
                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;