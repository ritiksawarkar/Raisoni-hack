import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import StudentProgressGapFinder from "./components/StudentProgressGapFinder";
import Login from "./components/Login";
import LessonDifficultyAdjuster from "./components/LessonDifficultyAdjuster";
import PerformanceAnalytics from "./components/PerformanceAnalytics";
import MockTestCreator from "./components/MockTestCreator";
import StudyPathGuide from "./components/StudyPathGuide";
import ProgressDashboard from "./components/ProgressDashboard";
import ReportGenerator from "./components/ReportGenerator";
import StudyMatchmaker from "./components/StudyMatchmaker";
import DataPrivacyShield from "./components/DataPrivacyShield";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import "./App.css";

// ProtectedRoute component
function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/auth" />;
}

// Header component
function Header({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    // Since setUser is not passed, perhaps reload or something, but for now, alert
    alert("Logged out!");
    window.location.reload(); // Simple logout
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" style={{ color: "#2b6cb0", textDecoration: "none" }}>
            AI Learning Platform
          </Link>
        </div>
        <div className="nav-links">
          {user ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginRight: 64,
                  position: "relative",
                }}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${user}&size=32&background=2b6cb0&color=fff&rounded=true`}
                  alt="Profile"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "2px solid #2b6cb0",
                  }}
                />
                <span style={{ color: "#2b6cb0", fontWeight: 600 }}>
                  {user}
                </span>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: 24,
                    color: "#2b6cb0",
                  }}
                >
                  ⋮
                </button>
                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: 40,
                      right: 0,
                      background: "#fff",
                      border: "1px solid #e3f0ff",
                      borderRadius: 8,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      zIndex: 1000,
                      minWidth: 120,
                    }}
                  >
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        color: "#e53e3e",
                        fontWeight: 600,
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-btn">
                Sign Up
              </Link>
              <Link to="/auth" className="nav-btn">
                Log In
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

// Footer component
function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        background: "#2b6cb0",
        color: "#fff",
        padding: "0.7rem 0",
        marginTop: "2.5rem",
      }}
    >
      © {new Date().getFullYear()} AI-Driven Personalized Learning Platform
    </footer>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="main-container">
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/progress-gap-finder"
          element={
            <ProtectedRoute user={user}>
              <StudentProgressGapFinder />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/lesson-difficulty"
          element={
            <ProtectedRoute user={user}>
              <LessonDifficultyAdjuster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/performance-analytics"
          element={
            <ProtectedRoute user={user}>
              <PerformanceAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock-test-creator"
          element={
            <ProtectedRoute user={user}>
              <MockTestCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-path-guide"
          element={
            <ProtectedRoute user={user}>
              <StudyPathGuide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress-dashboard"
          element={
            <ProtectedRoute user={user}>
              <ProgressDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-generator"
          element={
            <ProtectedRoute user={user}>
              <ReportGenerator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-matchmaker"
          element={
            <ProtectedRoute user={user}>
              <StudyMatchmaker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/data-privacy-shield"
          element={
            <ProtectedRoute user={user}>
              <DataPrivacyShield />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
