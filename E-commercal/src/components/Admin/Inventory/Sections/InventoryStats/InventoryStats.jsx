import "./InventoryStats.css";

import {
  FiPackage,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

import useInventory from "../../hooks/useInventory";

import StatCard from "./StatCard";

const InventoryStats = () => {
  const { stats } = useInventory();

  return (
    <div className="inventory-stats">
      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        icon={<FiPackage />}
      />

      <StatCard
        title="In Stock"
        value={stats.inStock}
        icon={<FiCheckCircle />}
      />

      <StatCard
        title="Low Stock"
        value={stats.lowStock}
        icon={<FiAlertTriangle />}
      />

      <StatCard
        title="Out of Stock"
        value={stats.outOfStock}
        icon={<FiXCircle />}
      />
    </div>
  );
};

export default InventoryStats;
