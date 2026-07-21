import { useEffect, useState } from "react";
import "./RecentOrders.css";
import { GetDashboardStats } from "../../../../../services/DashboardService";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    GetDashboardStats()
      .then((stats) => setOrders(stats.recentOrders || []))
      .catch(() => {});
  }, []);

  return (
    <div className="recent-orders">
      <div className="recent-orders-header">
        <h3>Recent Orders</h3>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>#{order.orderId}</td>

                <td>{order.customerName}</td>

                <td>${Number(order.total).toFixed(2)}</td>

                <td>
                  <span className={`status ${order.status?.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

                <td>
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
