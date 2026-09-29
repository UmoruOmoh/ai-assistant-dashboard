import React, { useState } from "react";
import "./style.css";

const requests = [
  {
    id: "#REQ-1048",
    title: "Unable to access account",
    customer: "Sarah Johnson",
    status: "Pending",
    time: "12 min ago",
  },
  {
    id: "#REQ-1047",
    title: "Billing information update",
    customer: "Daniel Smith",
    status: "In Progress",
    time: "28 min ago",
  },
  {
    id: "#REQ-1046",
    title: "Password reset request",
    customer: "Michael Brown",
    status: "Resolved",
    time: "1 hr ago",
  },
  {
    id: "#REQ-1045",
    title: "Payment confirmation issue",
    customer: "Emma Wilson",
    status: "Resolved",
    time: "2 hrs ago",
  },
  {
    id: "#REQ-1044",
    title: "Technical support request",
    customer: "James Taylor",
    status: "Pending",
    time: "3 hrs ago",
  },
];

const activities = [
  {
    text: "Request #REQ-1046 was marked as resolved",
    time: "15 minutes ago",
  },
  {
    text: "New request #REQ-1048 was created",
    time: "32 minutes ago",
  },
  {
    text: "Daniel Smith updated billing information",
    time: "1 hour ago",
  },
  {
    text: "Request #REQ-1045 was assigned to Support",
    time: "2 hours ago",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = (text = message) => {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();
    const lowerMessage = userMessage.toLowerCase();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setError(false);
    setLoading(true);

    if (lowerMessage.includes("trigger error")) {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 900);

      return;
    }

    setTimeout(() => {
      let response =
        "I can help you understand your service operations data. Try asking me about requests, metrics, or recent activity.";

      if (
        lowerMessage.includes("pending") ||
        lowerMessage.includes("summarize")
      ) {
        response =
          "The dashboard shows 12 pending requests overall. In the recent requests list, 2 of the displayed requests are pending: an account access issue and a technical support request. I recommend reviewing the oldest pending request first.";
      } else if (
        lowerMessage.includes("metric") ||
        lowerMessage.includes("explain")
      ) {
        response =
          "Your dashboard shows 248 total requests, 12 pending, 186 resolved, and an average response time of 2h 14m. Pending requests are the main area to monitor.";
      } else if (
        lowerMessage.includes("activity") ||
        lowerMessage.includes("recent")
      ) {
        response =
          "Recent activity shows requests being resolved, new support tickets being created, and requests being assigned to the support team.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);

      setLoading(false);
    }, 1200);
  };

  const handleRetry = () => {
    setError(false);
  };

  const renderDashboard = () => (
    <>
      <section className="welcome">
        <div>
          <h1>Good morning, Omoh</h1>
          <p>
            Here's what's happening with your service operations today.
          </p>
        </div>

        <button
          className="assistant-button"
          onClick={() => setAssistantOpen(true)}
        >
          ✦ Ask AI
        </button>
      </section>

      <section className="metrics">
        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Total Requests</span>
            <div className="metric-icon">▤</div>
          </div>

          <div className="metric-value">248</div>
          <div className="metric-change positive">
            ↑ 12.5% this month
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Pending</span>
            <div className="metric-icon">◷</div>
          </div>

          <div className="metric-value">12</div>
          <div className="metric-change warning">
            Needs attention
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Resolved</span>
            <div className="metric-icon">✓</div>
          </div>

          <div className="metric-value">186</div>
          <div className="metric-change positive">
            ↑ 8.2% this month
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-label">Avg. Response</span>
            <div className="metric-icon">◴</div>
          </div>

          <div className="metric-value">2h 14m</div>
          <div className="metric-change positive">
            ↓ 18 min improvement
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="card requests-card">
          <div className="card-header">
            <div className="card-title">Recent Requests</div>
            <button
              className="card-link"
              onClick={() => setActivePage("Requests")}
            >
              View all
            </button>
          </div>

          <div className="request-list">
            {requests.map((request) => (
              <div className="request-row" key={request.id}>
                <div className="request-main">
                  <div className="request-id">{request.id}</div>
                  <div className="request-title">
                    {request.title}
                  </div>
                  <div className="request-meta">
                    {request.customer}
                  </div>
                </div>

                <div className="request-right">
                  <span
                    className={`status ${request.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {request.status}
                  </span>

                  <span className="request-time">
                    {request.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card activity-card">
          <div className="card-header">
            <div className="card-title">Recent Activity</div>
            <button
              className="card-link"
              onClick={() => setActivePage("Activity")}
            >
              View all
            </button>
          </div>

          <div className="activity-list">
            {activities.map((activity, index) => (
              <div className="activity-item" key={index}>
                <div className="activity-dot"></div>

                <div>
                  <div className="activity-text">
                    {activity.text}
                  </div>

                  <div className="activity-time">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderRequests = () => (
    <section>
      <div className="welcome">
        <div>
          <h1>Requests</h1>
          <p>Manage and monitor customer service requests.</p>
        </div>

        <button
          className="assistant-button"
          onClick={() => setAssistantOpen(true)}
        >
          ✦ Ask AI
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">All Requests</div>
          <span className="metric-label">248 total</span>
        </div>

        <div className="request-list">
          {requests.map((request) => (
            <div className="request-row" key={request.id}>
              <div className="request-main">
                <div className="request-id">{request.id}</div>
                <div className="request-title">
                  {request.title}
                </div>
                <div className="request-meta">
                  {request.customer}
                </div>
              </div>

              <div className="request-right">
                <span
                  className={`status ${request.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {request.status}
                </span>

                <span className="request-time">
                  {request.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderActivity = () => (
    <section>
      <div className="welcome">
        <div>
          <h1>Activity</h1>
          <p>Keep track of recent service operations.</p>
        </div>

        <button
          className="assistant-button"
          onClick={() => setAssistantOpen(true)}
        >
          ✦ Ask AI
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Activity</div>
        </div>

        <div className="activity-list">
          {activities.map((activity, index) => (
            <div className="activity-item" key={index}>
              <div className="activity-dot"></div>

              <div>
                <div className="activity-text">
                  {activity.text}
                </div>

                <div className="activity-time">
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderAnalytics = () => (
    <section>
      <div className="welcome">
        <div>
          <h1>Analytics</h1>
          <p>Monitor your service operation performance.</p>
        </div>

        <button
          className="assistant-button"
          onClick={() => setAssistantOpen(true)}
        >
          ✦ Ask AI
        </button>
      </div>

      <section className="metrics">
        <div className="metric-card">
          <div className="metric-label">Total Requests</div>
          <div className="metric-value">248</div>
          <div className="metric-change positive">
            ↑ 12.5% this month
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Resolution Rate</div>
          <div className="metric-value">75%</div>
          <div className="metric-change positive">
            ↑ 8.2% this month
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Pending Requests</div>
          <div className="metric-value">12</div>
          <div className="metric-change warning">
            Needs attention
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg. Response</div>
          <div className="metric-value">2h 14m</div>
          <div className="metric-change positive">
            ↓ 18 min improvement
          </div>
        </div>
      </section>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Performance Overview</div>
        </div>

        <p>
          Service performance is trending positively, with faster
          response times and an increase in resolved requests this
          month.
        </p>
      </div>
    </section>
  );

  const renderSettings = () => (
    <section>
      <div className="welcome">
        <div>
          <h1>Settings</h1>
          <p>Manage your OpsFlow workspace preferences.</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Workspace Settings</div>
        </div>

        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-dot"></div>
            <div>
              <div className="activity-text">
                Notifications
              </div>
              <div className="activity-time">
                Manage dashboard and request notifications.
              </div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-dot"></div>
            <div>
              <div className="activity-text">
                AI Assistant
              </div>
              <div className="activity-time">
                Configure how the assistant works with dashboard
                data.
              </div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-dot"></div>
            <div>
              <div className="activity-text">
                Account Preferences
              </div>
              <div className="activity-time">
                Manage your profile and workspace preferences.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">O</div>
          <span>OpsFlow</span>
        </div>

        <nav className="nav">
          <button
            className={`nav-item ${
              activePage === "Dashboard" ? "active" : ""
            }`}
            onClick={() => setActivePage("Dashboard")}
          >
            <span>▦</span>
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${
              activePage === "Requests" ? "active" : ""
            }`}
            onClick={() => setActivePage("Requests")}
          >
            <span>▤</span>
            <span>Requests</span>
          </button>

          <button
            className={`nav-item ${
              activePage === "Activity" ? "active" : ""
            }`}
            onClick={() => setActivePage("Activity")}
          >
            <span>◷</span>
            <span>Activity</span>
          </button>

          <button
            className={`nav-item ${
              activePage === "Analytics" ? "active" : ""
            }`}
            onClick={() => setActivePage("Analytics")}
          >
            <span>◩</span>
            <span>Analytics</span>
          </button>

          <button
            className={`nav-item ${
              activePage === "Settings" ? "active" : ""
            }`}
            onClick={() => setActivePage("Settings")}
          >
            <span>⚙</span>
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="user-profile">
            <div className="avatar">OU</div>

            <div className="user-info">
              <div className="user-name">Omoh Umoru</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="topbar">
          <div className="eyebrow">Service Operations</div>

          <div className="topbar-actions">
            <button className="icon-button">⌕</button>
            <button className="icon-button">♧</button>
            <div className="small-avatar">OU</div>
          </div>
        </header>

        {activePage === "Dashboard" && renderDashboard()}
        {activePage === "Requests" && renderRequests()}
        {activePage === "Activity" && renderActivity()}
        {activePage === "Analytics" && renderAnalytics()}
        {activePage === "Settings" && renderSettings()}
      </main>

      {/* AI ASSISTANT */}
      {assistantOpen && (
        <aside className="assistant-panel">
          <div className="assistant-header">
            <div className="assistant-title">
              <div className="ai-icon">✦</div>

              <div>
                <div className="assistant-title-text">
                  OpsFlow AI
                </div>

                <div className="assistant-status">
                  Your service operations assistant
                </div>
              </div>
            </div>

            <button
              className="close-button"
              onClick={() => setAssistantOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="assistant-content">
            {messages.length === 0 && !loading && !error ? (
              <div className="assistant-empty">
                <div className="large-ai-icon">✦</div>

                <h2>How can I help?</h2>

                <p>
                  Ask me about your requests, metrics, or recent
                  activity.
                </p>

                <div className="suggestions">
                  <button
                    className="suggestion"
                    onClick={() =>
                      setMessage("Summarize the pending requests")
                    }
                  >
                    Summarize the pending requests
                  </button>

                  <button
                    className="suggestion"
                    onClick={() =>
                      setMessage("Explain the dashboard metrics")
                    }
                  >
                    Explain the dashboard metrics
                  </button>

                  <button
                    className="suggestion"
                    onClick={() =>
                      setMessage("What happened recently?")
                    }
                  >
                    What happened recently?
                  </button>
                </div>
              </div>
            ) : (
              <div className="messages">
                {messages.map((msg, index) => (
                  <div
                    className={`message ${
                      msg.role === "user"
                        ? "user-message"
                        : "ai-message"
                    }`}
                    key={index}
                  >
                    {msg.role === "assistant" && (
                      <div className="message-ai-icon">✦</div>
                    )}

                    <div className="message-bubble">
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="message ai-message">
                    <div className="message-ai-icon">✦</div>

                    <div className="loading">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="error-message">
                    Something went wrong while processing your
                    request.
                    <br />

                    <button onClick={handleRetry}>
                      Try again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="assistant-input-area">
            <div className="input-wrapper">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Ask anything..."
              />

              <button
                className="send-button"
                onClick={() => handleSend()}
                disabled={!message.trim() || loading}
              >
                ↑
              </button>
            </div>

            <div className="disclaimer">
              AI responses are based on your dashboard data.
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

export default App;
