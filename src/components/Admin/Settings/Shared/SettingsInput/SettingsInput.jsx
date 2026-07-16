import "./SettingsInput.css";

const SettingsInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="settings-input-group">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SettingsInput;
