import React, { useState } from "react";
import "../App.css";

const auditLogs = [
  {
    id: 1,
    action: "Data accessed by teacher",
    timestamp: "2026-02-03 10:30 AM",
    user: "Teacher John",
  },
  {
    id: 2,
    action: "Privacy settings updated",
    timestamp: "2026-02-02 3:45 PM",
    user: "Student Aarav",
  },
  {
    id: 3,
    action: "Report generated",
    timestamp: "2026-02-01 9:15 AM",
    user: "System",
  },
  {
    id: 4,
    action: "Data encrypted",
    timestamp: "2026-01-30 2:00 PM",
    user: "Admin",
  },
];

function DataPrivacyShield() {
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [accessLevel, setAccessLevel] = useState("Restricted");

  const handleToggle = (setter) => setter((prev) => !prev);

  return (
    <section
      style={{
        width: "100vw",
        background: "#f6f8fa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 0,
        padding: 0,
        minHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          padding: "2.5rem 1rem",
          marginTop: "2.5rem",
          marginBottom: "2.5rem",
        }}
      >
        <h2
          style={{
            color: "#2b6cb0",
            textAlign: "center",
            fontWeight: 800,
            fontSize: 30,
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          Secure Student Data & Privacy Shield
        </h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              color: "#2b6cb0",
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 20,
            }}
          >
            Privacy Settings
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: "#444" }}>
                  Data Sharing with Third Parties
                </div>
                <div style={{ color: "#666", fontSize: 14 }}>
                  Allow sharing anonymized data for research
                </div>
              </div>
              <label
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 50,
                  height: 24,
                }}
              >
                <input
                  type="checkbox"
                  checked={dataSharing}
                  onChange={() => handleToggle(setDataSharing)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: dataSharing ? "#2b6cb0" : "#ccc",
                    transition: "0.4s",
                    borderRadius: 24,
                  }}
                ></span>
                <span
                  style={{
                    position: "absolute",
                    content: "",
                    height: 18,
                    width: 18,
                    left: dataSharing ? 28 : 3,
                    bottom: 3,
                    backgroundColor: "white",
                    transition: "0.4s",
                    borderRadius: "50%",
                  }}
                ></span>
              </label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: "#444" }}>
                  Analytics Tracking
                </div>
                <div style={{ color: "#666", fontSize: 14 }}>
                  Enable usage analytics for improvements
                </div>
              </div>
              <label
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 50,
                  height: 24,
                }}
              >
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={() => handleToggle(setAnalytics)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: analytics ? "#2b6cb0" : "#ccc",
                    transition: "0.4s",
                    borderRadius: 24,
                  }}
                ></span>
                <span
                  style={{
                    position: "absolute",
                    content: "",
                    height: 18,
                    width: 18,
                    left: analytics ? 28 : 3,
                    bottom: 3,
                    backgroundColor: "white",
                    transition: "0.4s",
                    borderRadius: "50%",
                  }}
                ></span>
              </label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: "#444" }}>
                  Privacy Notifications
                </div>
                <div style={{ color: "#666", fontSize: 14 }}>
                  Receive alerts on data access
                </div>
              </div>
              <label
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 50,
                  height: 24,
                }}
              >
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => handleToggle(setNotifications)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: notifications ? "#2b6cb0" : "#ccc",
                    transition: "0.4s",
                    borderRadius: 24,
                  }}
                ></span>
                <span
                  style={{
                    position: "absolute",
                    content: "",
                    height: 18,
                    width: 18,
                    left: notifications ? 28 : 3,
                    bottom: 3,
                    backgroundColor: "white",
                    transition: "0.4s",
                    borderRadius: "50%",
                  }}
                ></span>
              </label>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              color: "#2b6cb0",
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 20,
            }}
          >
            Data Access Controls
          </h3>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600, color: "#2b6cb0", fontSize: 18 }}>
              Access Level
            </label>
            <select
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1.5px solid #e3f0ff",
                fontWeight: 600,
                color: "#225080",
                marginTop: 8,
                fontSize: 16,
              }}
            >
              <option value="Public">Public</option>
              <option value="Restricted">Restricted</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => alert("Data exported securely (mock)")}
              style={{
                flex: 1,
                padding: "12px 0",
                background: "#38a169",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px #38a16933",
                transition: "all 0.2s",
              }}
            >
              Export Data
            </button>
            <button
              onClick={() => alert("Data deleted (mock)")}
              style={{
                flex: 1,
                padding: "12px 0",
                background: "#e53e3e",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 2px 8px #e53e3e33",
                transition: "all 0.2s",
              }}
            >
              Delete Data
            </button>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
            marginBottom: 32,
          }}
        >
          <h3
            style={{
              color: "#2b6cb0",
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 20,
            }}
          >
            Security Status
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 600, color: "#444" }}>
                Data Encryption
              </span>
              <span style={{ color: "#38a169", fontWeight: 700 }}>Enabled</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 600, color: "#444" }}>
                Two-Factor Authentication
              </span>
              <span style={{ color: "#38a169", fontWeight: 700 }}>Active</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 600, color: "#444" }}>
                Compliance (GDPR)
              </span>
              <span style={{ color: "#38a169", fontWeight: 700 }}>
                Compliant
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1.5px solid #e3f0ff",
            boxShadow: "0 4px 24px rgba(43,108,176,0.09)",
            padding: 32,
          }}
        >
          <h3
            style={{
              color: "#2b6cb0",
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 20,
            }}
          >
            Audit Logs
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {auditLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: 12,
                  border: "1px solid #e3f0ff",
                  borderRadius: 8,
                  background: "#f8fbff",
                }}
              >
                <div style={{ fontWeight: 600, color: "#444" }}>
                  {log.action}
                </div>
                <div style={{ color: "#666", fontSize: 14 }}>
                  {log.timestamp} by {log.user}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataPrivacyShield;
