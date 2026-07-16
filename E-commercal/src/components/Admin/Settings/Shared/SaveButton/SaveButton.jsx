import "./SaveButton.css";

const SaveButton = ({
  children = "Save Changes",
  onClick,
  disabled = false,
}) => {
  return (
    <button className="save-btn" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default SaveButton;
