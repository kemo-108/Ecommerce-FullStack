import "./StatsCards.css";
import StatCard from "./StatCards";

import {
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
  FaBoxOpen,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

const StatsCards = () => {
  return (
    <div className="stats-cards">
      <StatCard
        title="Revenue"
        value="$25,400"
        percentage="+12%"
        color="#E9F8EE"
        icon={<FaDollarSign />}
      />

      <StatCard
        title="Orders"
        value="156"
        percentage="+8%"
        color="#FFF6DD"
        icon={<FaShoppingBag />}
      />

      <StatCard
        title="Customers"
        value="420"
        percentage="+5%"
        color="#E8F1FF"
        icon={<FaUsers />}
      />

      <StatCard
        title="Products"
        value="86"
        percentage="+3%"
        color="#FFEAF2"
        icon={<FaBoxOpen />}
      />

      <StatCard
        title="Profit"
        value="$8,250"
        percentage="+18%"
        color="#EAF9F3"
        icon={<FaChartLine />}
      />

      <StatCard
        title="Expenses"
        value="$3,120"
        percentage="-2%"
        color="#FFF0F0"
        icon={<FaWallet />}
      />
    </div>
  );
};

export default StatsCards;
