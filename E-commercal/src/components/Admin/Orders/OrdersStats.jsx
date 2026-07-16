import { FiShoppingBag, FiClock, FiTruck, FiXCircle } from "react-icons/fi";

import "./OrdersStats.css";

const OrdersStats = ({ orders }) => {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled",
  ).length;

  return (
    <div className="orders-stats">
      <div className="orders-stat-card">
        <div className="orders-stat-icon total">
          <FiShoppingBag />
        </div>

        <div className="orders-stat-content">
          <h3>{totalOrders}</h3>
          <p>Total Orders</p>
        </div>
      </div>

      <div className="orders-stat-card">
        <div className="orders-stat-icon pending">
          <FiClock />
        </div>

        <div className="orders-stat-content">
          <h3>{pendingOrders}</h3>
          <p>Pending Orders</p>
        </div>
      </div>

      <div className="orders-stat-card">
        <div className="orders-stat-icon delivered">
          <FiTruck />
        </div>

        <div className="orders-stat-content">
          <h3>{deliveredOrders}</h3>
          <p>Delivered Orders</p>
        </div>
      </div>

      <div className="orders-stat-card">
        <div className="orders-stat-icon cancelled">
          <FiXCircle />
        </div>

        <div className="orders-stat-content">
          <h3>{cancelledOrders}</h3>
          <p>Cancelled Orders</p>
        </div>
      </div>
    </div>
  );
};

export default OrdersStats;
