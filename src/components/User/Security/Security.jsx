import "./Security.css";

import ChangePassword from "./Sections/ChangePassword/ChangePassword";
import NotificationSettings from "./Sections/NotificationSettings/NotificationSettings";
import DeleteAccount from "./Sections/DeleteAccount/DeleteAccount";

const Security = () => {
  return (
    <div className="security-page">
      <div className="security-header">
        <h2>Security & Privacy</h2>

        <p>
          Manage your password, notifications and account security settings.
        </p>
      </div>

      <ChangePassword />

      <NotificationSettings />

      <DeleteAccount />
    </div>
  );
};

export default Security;
