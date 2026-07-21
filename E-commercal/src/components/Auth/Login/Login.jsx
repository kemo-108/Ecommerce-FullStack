import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Login as LoginRequest, SaveSession } from "../../../services/AuthService";
import { toast } from "react-toastify";
import logo from "../../../image/image.png";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const data = await LoginRequest({
        email: form.email,
        password: form.password,
        remember,
      });
      SaveSession(data);
      toast.success("Logged in successfully");

      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/account/profile");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password";
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

        <h2>Quality art supplies, delivered.</h2>
        <p>
          Sign in to track your orders, manage your wishlist, and check out
          faster next time.
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-card-logo">
            <img src={logo} alt="Art Corner logo" />
            <span>Art Corner</span>
          </div>

          <h1>Welcome back</h1>
          <p className="auth-subtitle">Log in to your account to continue.</p>

          <form onSubmit={handleSubmit}>
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

            <div className="remmember-forgot">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
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

export default Login;
