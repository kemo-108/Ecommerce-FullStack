import "./AnalyticsChart.css";

const AnalyticsChart = ({ title, children, action }) => {
  return (
    <div className="analytics-chart">
      <div className="analytics-chart-header">
        <h3>{title}</h3>

        {action && <div className="analytics-chart-action">{action}</div>}
      </div>

      <div className="analytics-chart-body">{children}</div>
    </div>
  );
};

export default AnalyticsChart;
