import "./SettingsCard.css";

const SettingsCard = ({ icon, title, children }) => {
  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <div className="settings-card-icon">{icon}</div>

        <h3>{title}</h3>
      </div>

      <div className="settings-card-body">{children}</div>
    </div>
  );
};

export default SettingsCard;
