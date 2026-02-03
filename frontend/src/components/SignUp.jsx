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

function SignUp({ onLogin }) {
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
    // Call backend API
    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setSuccess("Account created successfully!");
          localStorage.setItem("token", data.token);
          onLogin(data.user.name);
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
          setTimeout(() => navigate("/"), 1000);
        } else {
          setError(data.message || "Signup failed");
        }
      })
      .catch(() => {
        setError("Network error");
      });
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
