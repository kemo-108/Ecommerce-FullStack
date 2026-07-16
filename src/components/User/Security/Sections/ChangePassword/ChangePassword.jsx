import "./ChangePassword.css";
import { FiLock } from "react-icons/fi";

const ChangePassword = () => {
  return (
    <div className="change-password-card">
      <div className="card-title">
        <FiLock />
        <h3>Change Password</h3>
      </div>

      <div className="password-form">
        <div className="input-group">
          <label>Current Password</label>
          <input type="password" placeholder="Current Password" />
        </div>

        <div className="input-group">
          <label>New Password</label>
          <input type="password" placeholder="New Password" />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" />
        </div>

        <button className="change-password-btn">Update Password</button>
      </div>
    </div>
  );
};

export default ChangePassword;
