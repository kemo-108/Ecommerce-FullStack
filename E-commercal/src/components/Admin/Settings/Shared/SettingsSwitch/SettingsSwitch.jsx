import "./SettingsSwitch.css";

const SettingsSwitch = ({
  label,
  checked = false,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="settings-switch">
      <span>{label}</span>

      <label className={`switch ${disabled ? "disabled" : ""}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />

        <span className="slider"></span>
      </label>
    </div>
  );
};

export default SettingsSwitch;
