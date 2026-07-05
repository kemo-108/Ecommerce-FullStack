import { useState } from "react";
import "./Reports.css";

import ReportsHeader from "./Sections/ReportsHeader/ReportsHeader";
import ReportsTabs from "./Sections/ReportsTabs/ReportsTabs";
import ReportsContent from "./Sections/ReportsContent/ReportsContent";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <div className="reports-page">
      <ReportsHeader />

      <ReportsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ReportsContent activeTab={activeTab} />
    </div>
  );
};

export default Reports;
