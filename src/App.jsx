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
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
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

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">O</div>
          <span>OpsFlow</span>
        </div>

        <nav className="nav">
          <button className="nav-item active">
            <span>▦</span>
            <span>Dashboard</span>
          </button>

          <button className="nav-item">
            <span>▤</span>
            <span>Requests</span>
          </button>

          <button className="nav-item">
            <span>◷</span>
            <span>Activity</span>
          </button>

          <button className="nav-item">
            <span>◩</span>
            <span>Analytics</span>
          </button>

          <button className="nav-item">
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

        {/* WELCOME */}
        <section className="welcome">
          <div>
            <h1>Good morning, Omoh</h1>
            <p>Here's what's happening with your service operations today.</p>
          </div>

          <button
            className="assistant-button"
            onClick={() => setAssistantOpen(true)}
          >
            ✦ Ask AI
          </button>
        </section>

        {/* METRICS */}
        <section className="metrics">
          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Total Requests</span>
              <div className="metric-icon">▤</div>
            </div>

            <div className="metric-value">248</div>
            <div className="metric-change positive">↑ 12.5% this month</div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Pending</span>
              <div className="metric-icon">◷</div>
            </div>

            <div className="metric-value">12</div>
            <div className="metric-change warning">Needs attention</div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Resolved</span>
              <div className="metric-icon">✓</div>
            </div>

            <div className="metric-value">186</div>
            <div className="metric-change positive">↑ 8.2% this month</div>
          </div>

          <div className="metric-card">
            <div className="metric-top">
              <span className="metric-label">Avg. Response</span>
              <div className="metric-icon">◴</div>
            </div>

            <div className="metric-value">2h 14m</div>
            <div className="metric-change positive">↓ 18 min improvement</div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="content-grid">
          {/* REQUESTS */}
          <div className="card requests-card">
            <div className="card-header">
              <div className="card-title">Recent Requests</div>
              <button className="card-link">View all</button>
            </div>

            <div className="request-list">
              {requests.map((request) => (
                <div className="request-row" key={request.id}>
                  <div className="request-main">
                    <div className="request-id">{request.id}</div>
                    <div className="request-title">{request.title}</div>
                    <div className="request-meta">{request.customer}</div>
                  </div>

                  <div className="request-right">
                    <span
                      className={`status ${request.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {request.status}
                    </span>

                    <span className="request-time">{request.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="card activity-card">
            <div className="card-header">
              <div className="card-title">Recent Activity</div>
              <button className="card-link">View all</button>
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
                    Something went wrong while processing your request.
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
                onClick={handleSend}
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