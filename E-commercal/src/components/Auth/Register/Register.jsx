import React, { useState } from "react";
import { FiUser, FiLock, FiMail, FiPhone } from "react-icons/fi";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Register as RegisterRequest, SaveSession } from "../../../services/AuthService";
import { toast } from "react-toastify";
import logo from "../../../image/image.png";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((v) => !v)) {
      toast.error("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const data = await RegisterRequest({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      SaveSession(data);
      toast.success("Account created successfully");
      navigate("/account/profile");
    } catch (error) {
      const message =
        error.response?.data?.message || "Could not create account";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <Link to="/" className="auth-logo">
          <img src={logo} alt="Art Corner logo" />
          <span>Art Corner</span>
        </Link>

        <h2>Join the Art Corner community.</h2>
        <p>
          Create an account to save your favorites, track orders, and check
          out in seconds.
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-card-logo">
            <img src={logo} alt="Art Corner logo" />
            <span>Art Corner</span>
          </div>

          <h1>Create your account</h1>
          <p className="auth-subtitle">It only takes a minute.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-box">
                <FiUser className="icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-box">
                <FiMail className="icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone</label>
              <div className="input-box">
                <FiPhone className="icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="01xxxxxxxxx"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-box">
                <FiLock className="icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-box">
                <FiLock className="icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>

            <div className="register-link">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>

            <Link className="link-home" to="/">
              Back to Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
