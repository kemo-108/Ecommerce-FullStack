import "./ChangePassword.css";

const ChangePassword = () => {
  return (
    <section className="change-password">
      <div className="section-header">
        <div>
          <h2>Change Password</h2>
          <p>Update your account password.</p>
        </div>
      </div>

      <div className="password-grid">
        <div className="input-group">
          <label>Current Password</label>
          <input type="password" placeholder="********" />
        </div>

        <div className="input-group">
          <label>New Password</label>
          <input type="password" placeholder="********" />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="********" />
        </div>
      </div>

      <button className="save-password-btn">Update Password</button>
    </section>
  );
};

export default ChangePassword;
