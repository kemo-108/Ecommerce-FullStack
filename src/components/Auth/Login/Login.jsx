import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Login as LoginRequest, SaveSession } from "../../../services/AuthService";
import { toast } from "react-toastify";

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
    <div className="login">
      <div className="login-container">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>

            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <FaUnlockAlt className="icon" />
            </div>

            <div className="remmember-forgot">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>

              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <br />
            <Link className="link-home" to="/">
              Home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
