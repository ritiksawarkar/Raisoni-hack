import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "center",
        background: "#2b6cb0",
        color: "#fff",
        padding: "0.7rem 0",
      }}
    >
      © 2026 AI-Driven Personalized Learning Platform
    </footer>
  );
}

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Store user data in localStorage
    localStorage.setItem(
      "user_" + form.email,
      JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    );
    // Simulate success
    setSuccess("Account created successfully!");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    // Redirect to login page after 1 second
    setTimeout(() => navigate("/auth"), 1000);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div
        className="signup-scroll-wrapper"
        style={{ paddingTop: "32px", paddingBottom: "32px" }}
      >
        <div className="signup-container">
          <h2>Create Your Account</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>
            {error && <div className="signup-error">{error}</div>}
            {success && <div className="signup-success">{success}</div>}
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;
