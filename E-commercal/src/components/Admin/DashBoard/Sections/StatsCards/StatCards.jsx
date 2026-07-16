import "./StatCards.css";

const StatCard = ({ title, value, percentage, icon, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <h5>{title}</h5>

        <h2>{value}</h2>

        <span>{percentage}</span>
      </div>

      <div className="stat-card-icon" style={{ background: color }}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
