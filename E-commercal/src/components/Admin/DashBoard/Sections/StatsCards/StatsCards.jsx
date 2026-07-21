import { useEffect, useState } from "react";
import "./StatsCards.css";
import StatCard from "./StatCards";

import { FaDollarSign, FaShoppingBag, FaUsers, FaBoxOpen } from "react-icons/fa";
import { GetDashboardStats } from "../../../../../services/DashboardService";

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    GetDashboardStats()
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div className="stats-cards">
      <StatCard
        title="Revenue"
        value={`$${Number(stats.totalRevenue).toLocaleString()}`}
        color="#E9F8EE"
        icon={<FaDollarSign />}
      />

      <StatCard
        title="Orders"
        value={String(stats.totalOrders)}
        color="#FFF6DD"
        icon={<FaShoppingBag />}
      />

      <StatCard
        title="Customers"
        value={String(stats.totalCustomers)}
        color="#E8F1FF"
        icon={<FaUsers />}
      />

      <StatCard
        title="Products"
        value={String(stats.totalProducts)}
        color="#FFEAF2"
        icon={<FaBoxOpen />}
      />
    </div>
  );
};

export default StatsCards;
