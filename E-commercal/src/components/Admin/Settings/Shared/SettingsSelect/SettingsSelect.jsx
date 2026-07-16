import "./SettingsSelect.css";

const SettingsSelect = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="settings-select-group">
      <label>{label}</label>

      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SettingsSelect;
