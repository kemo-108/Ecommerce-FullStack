import "./AnalyticsCard.css";

const AnalyticsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "#ff4d8d",
}) => {
  return (
    <div className="analytics-card">
      <div className="analytics-card-top">
        <div
          className="analytics-card-icon"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {Icon && <Icon />}
        </div>

        <div className="analytics-card-info">
          <span>{title}</span>
          <h3>{value}</h3>
        </div>
      </div>

      {subtitle && <p className="analytics-card-subtitle">{subtitle}</p>}
    </div>
  );
};

export default AnalyticsCard;
