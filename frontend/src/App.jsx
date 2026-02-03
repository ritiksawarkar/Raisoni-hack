import { Routes, Route, Link } from "react-router-dom";
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

// Header component
function Header() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" style={{ color: "#2b6cb0", textDecoration: "none" }}>
            AI Learning Platform
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/signup" className="nav-btn">
            Sign Up
          </Link>
          <Link to="/auth" className="nav-btn">
            Log In
          </Link>
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
  return (
    <div className="main-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/progress-gap-finder"
          element={<StudentProgressGapFinder />}
        />
        <Route path="/auth" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/lesson-difficulty"
          element={<LessonDifficultyAdjuster />}
        />
        <Route
          path="/performance-analytics"
          element={<PerformanceAnalytics />}
        />
        <Route path="/mock-test-creator" element={<MockTestCreator />} />
        <Route path="/study-path-guide" element={<StudyPathGuide />} />
        <Route path="/progress-dashboard" element={<ProgressDashboard />} />
        <Route path="/report-generator" element={<ReportGenerator />} />
        <Route path="/study-matchmaker" element={<StudyMatchmaker />} />
        <Route path="/data-privacy-shield" element={<DataPrivacyShield />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
