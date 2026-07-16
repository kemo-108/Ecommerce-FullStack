import { useState } from "react";

const useReports = () => {
  const [activeTab, setActiveTab] = useState("sales");

  const [dateFilter, setDateFilter] = useState("month");

  const [loading, setLoading] = useState(false);

  return {
    activeTab,
    setActiveTab,

    dateFilter,
    setDateFilter,

    loading,
    setLoading,
  };
};

export default useReports;