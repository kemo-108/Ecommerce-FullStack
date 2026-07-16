import "./NotificationSettings.css";
import { FiBell } from "react-icons/fi";

const NotificationSettings = () => {
  return (
    <div className="notification-settings-card">
      <div className="card-title">
        <FiBell />
        <h3>Notification Settings</h3>
      </div>

      <div className="notification-list">
        <div className="notification-item">
          <div>
            <h4>Email Notifications</h4>
            <p>Receive important updates via email.</p>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Order Updates</h4>
            <p>Get notified when your order status changes.</p>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Promotional Emails</h4>
            <p>Receive offers and discounts.</p>
          </div>

          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div>
            <h4>Security Alerts</h4>
            <p>Be notified about login attempts and password changes.</p>
          </div>

          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
