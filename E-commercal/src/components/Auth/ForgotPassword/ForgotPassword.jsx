import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { ForgotPassword as ForgotPasswordRequest } from "../../../services/AuthService";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await ForgotPasswordRequest(email);
      setSent(true);
      toast.success("Reset link sent to your email");
    } catch (error) {
      const message =
        error.response?.data?.message || "Could not send reset link";
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
            <h1>Reset Password</h1>

            {sent ? (
              <p style={{ textAlign: "center", margin: "20px 0" }}>
                If an account exists for {email}, a reset link has been sent.
              </p>
            ) : (
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FaEnvelope className="icon" />
              </div>
            )}

            {!sent && (
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            )}

            <div className="register-link">
              <p>
                Remembered your password? <Link to="/login">Login</Link>
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

export default ForgotPassword;
