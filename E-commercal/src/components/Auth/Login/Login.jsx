import React from "react";
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <div className="wrapper">
          <form action="">
            <h1>Login</h1>

            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <FaUser className="icon" />
            </div>

            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <FaUnlockAlt className="icon" />
            </div>

            <div className="remmember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="btn">
              Login
            </button>

            <div className="register-link">
              <p>
                Don't have an account? <a href="#">Register</a>
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
