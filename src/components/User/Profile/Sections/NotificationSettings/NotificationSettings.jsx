import "./NotificationSettings.css";

const NotificationSettings = () => {
  return (
    <section className="notification-settings">
      <div className="section-header">
        <div>
          <h2>Notifications</h2>
          <p>Choose what notifications you receive.</p>
        </div>
      </div>

      <div className="notification-list">
        <div className="notification-item">
          <span>Order Updates</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="notification-item">
          <span>Promotions</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="notification-item">
          <span>Newsletter</span>
          <input type="checkbox" />
        </div>

        <div className="notification-item">
          <span>Special Offers</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </section>
  );
};

export default NotificationSettings;
