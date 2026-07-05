import "./RecentOrders.css";

const orders = [
  {
    id: "#ORD-1001",
    customer: "Ahmed Mostafa",
    amount: "$120",
    status: "Pending",
    date: "24 May 2025",
  },
  {
    id: "#ORD-1002",
    customer: "Sara Ali",
    amount: "$85",
    status: "Processing",
    date: "24 May 2025",
  },
  {
    id: "#ORD-1003",
    customer: "Mohamed Hassan",
    amount: "$150",
    status: "Shipped",
    date: "23 May 2025",
  },
  {
    id: "#ORD-1004",
    customer: "Omar Khaled",
    amount: "$60",
    status: "Delivered",
    date: "23 May 2025",
  },
];

const RecentOrders = () => {
  return (
    <div className="recent-orders">
      <div className="recent-orders-header">
        <h3>Recent Orders</h3>

        <button>View All</button>
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
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.amount}</td>

                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
