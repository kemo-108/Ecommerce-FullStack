import React, { useState } from "react";
import { FaUser, FaUnlockAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "../Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Register as RegisterRequest, SaveSession } from "../../../services/AuthService";
import { toast } from "react-toastify";

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
    <div className="login">
      <div className="login-container">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <FaUser className="icon" />
            </div>

            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <FaEnvelope className="icon" />
            </div>

            <div className="input-box">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <FaPhone className="icon" />
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

            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
              />
              <FaUnlockAlt className="icon" />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>

            <div className="register-link">
              <p>
                Already have an account? <Link to="/login">Login</Link>
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

export default Register;
