import "./ReportsTabs.css";
import reportsTabs from "../../Constants/reportsTabs";

const ReportsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="reports-tabs">
      {reportsTabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            className={`report-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon />

            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ReportsTabs;
