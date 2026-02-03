import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const moduleLinks = [
  {
    name: "Student Progress & Learning-Gap Finder",
    path: "/progress-gap-finder",
  },
  { name: "Automatic Lesson Difficulty Adjuster", path: "/lesson-difficulty" },
  {
    name: "Automated Performance Analytics & Insight Generator",
    path: "/performance-analytics",
  },
  {
    name: "AI-Generated Personalized Mock Test Creator",
    path: "/mock-test-creator",
  },
  { name: "Step-by-Step Study Path Guide", path: "/study-path-guide" },
  { name: "Student & Teacher Progress Dashboard", path: "/progress-dashboard" },
  { name: "Automated Student Report Generator", path: "/report-generator" },
  { name: "Student-to-Student Study Matchmaker", path: "/study-matchmaker" },
  {
    name: "Secure Student Data & Privacy Shield",
    path: "/data-privacy-shield",
  },
];

export function HeroSection() {
  return (
    <section className="hero">
      <h1>Personalized AI-Driven Learning</h1>
      <div
        style={{
          fontSize: "1.35rem",
          color: "#225080",
          fontWeight: 600,
          marginBottom: "1.2rem",
        }}
      >
        The future of education is here
      </div>
      <p>
        Unlock your full potential with a platform that adapts to your unique
        learning style, pace, and needs. Experience education reimagined with
        AI.
      </p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "2.2rem 0 1.5rem 0",
        }}
      >
        <div
          style={{
            width: 80,
            height: 4,
            background: "#2b6cb0",
            borderRadius: 2,
          }}
        />
      </div>
      <a href="#modules" className="cta-btn">
        Explore Modules
      </a>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section className="intro-section">
      <h2>Why Choose Our Platform?</h2>
      <div className="intro-grid">
        <div className="intro-card">
          <h3>Truly Personalized</h3>
          <p>
            AI adapts lessons, quizzes, and study paths to your strengths,
            weaknesses, and pace.
          </p>
        </div>
        <div className="intro-card">
          <h3>Continuous Progress Tracking</h3>
          <p>
            See your growth, close learning gaps, and get actionable insights at
            every step.
          </p>
        </div>
        <div className="intro-card">
          <h3>For Students & Teachers</h3>
          <p>
            Dashboards, reports, and collaboration tools for both learners and
            educators.
          </p>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="how-section">
      <h2>How It Works</h2>
      <ol className="how-list">
        <li>Sign up and set your learning goals.</li>
        <li>Take a quick assessment to personalize your journey.</li>
        <li>
          Learn, practice, and get instant feedback with AI-powered modules.
        </li>
        <li>Track your progress and adjust your path anytime.</li>
      </ol>
    </section>
  );
}

export function ModulesSection() {
  return (
    <section className="modules-section" id="modules">
      <h2>Platform Modules</h2>
      <div className="modules-grid">
        {moduleLinks.map((mod, idx) => (
          <Link
            to={mod.path}
            className="module-card"
            key={idx}
            style={{ textDecoration: "none" }}
          >
            <div className="module-number">{idx + 1}</div>
            <div className="module-title">{mod.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <h2>What Our Users Say</h2>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p>
            “This platform helped me find my weak areas and improve faster than
            ever!”
          </p>
          <span>- Priya, Student</span>
        </div>
        <div className="testimonial-card">
          <p>
            “The AI-generated reports and dashboards make teaching so much
            easier.”
          </p>
          <span>- Mr. Sharma, Teacher</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <main>
        <HeroSection />
        <WhyChooseSection />
        <HowItWorksSection />
        <ModulesSection />
        <TestimonialsSection />
        <div style={{ textAlign: "center", margin: "3.5rem 0 1.5rem 0" }}>
          <h3
            style={{
              color: "#2b6cb0",
              fontWeight: 700,
              marginBottom: "0.7rem",
            }}
          >
            Ready to start your personalized journey?
          </h3>
          <Link to="/signup" className="cta-btn" style={{ fontSize: "1.1rem" }}>
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
}
