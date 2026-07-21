import "./RefundStats.css";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
} from "react-icons/fi";

const RefundStats = ({ refunds = [] }) => {
  const pending = refunds.filter((r) => r.status === "Pending").length;
  const approved = refunds.filter((r) => r.status === "Approved").length;
  const rejected = refunds.filter((r) => r.status === "Rejected").length;
  const totalAmount = refunds
    .filter((r) => r.status === "Approved")
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const stats = [
    {
      id: 1,
      title: "Pending Requests",
      value: String(pending),
      icon: <FiClock />,
      className: "pending",
    },
    {
      id: 2,
      title: "Approved Requests",
      value: String(approved),
      icon: <FiCheckCircle />,
      className: "approved",
    },
    {
      id: 3,
      title: "Rejected Requests",
      value: String(rejected),
      icon: <FiXCircle />,
      className: "rejected",
    },
    {
      id: 4,
      title: "Total Refunded Amount",
      value: `$${totalAmount.toFixed(2)}`,
      icon: <FiDollarSign />,
      className: "amount",
    },
  ];

  return (
    <section className="refund-stats">
      {stats.map((stat) => (
        <div className="refund-stat-card" key={stat.id}>
          <div className={`refund-stat-icon ${stat.className}`}>
            {stat.icon}
          </div>

          <div className="refund-stat-content">
            <h5>{stat.title}</h5>
            <h2>{stat.value}</h2>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RefundStats;
