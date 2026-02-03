import React, { useState } from "react";
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

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    // Simulate login success
    setSuccess("Login successful!");
    setForm({ email: "", password: "" });
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
          <h2>Log In to Your Account</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
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
            {error && <div className="signup-error">{error}</div>}
            {success && <div className="signup-success">{success}</div>}
            <button type="submit" className="signup-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
