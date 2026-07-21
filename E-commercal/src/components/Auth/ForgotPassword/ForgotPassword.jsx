import React, { useState } from "react";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { ForgotPassword as ForgotPasswordRequest } from "../../../services/AuthService";
import { toast } from "react-toastify";
import logo from "../../../image/image.png";

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
    <div className="auth-page">
      <div className="auth-panel">
        <Link to="/" className="auth-logo">
          <img src={logo} alt="Art Corner logo" />
          <span>Art Corner</span>
        </Link>

        <h2>Forgot your password?</h2>
        <p>
          No worries — enter the email on your account and we'll send you a
          link to reset it.
        </p>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h1>Reset Password</h1>

          {sent ? (
            <div className="reset-sent">
              <FiCheckCircle className="reset-sent-icon" />
              <p>
                If an account exists for <strong>{email}</strong>, a reset
                link has been sent.
              </p>
            </div>
          ) : (
            <>
              <p className="auth-subtitle">
                Enter your email to receive a reset link.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Email</label>
                  <div className="input-box">
                    <FiMail className="icon" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}

          <div className="register-link">
            <p>
              Remembered your password? <Link to="/login">Login</Link>
            </p>
          </div>

          <Link className="link-home" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
