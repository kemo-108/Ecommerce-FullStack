import "./RefundStats.css";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
} from "react-icons/fi";

const RefundStats = () => {
  const stats = [
    {
      id: 1,
      title: "Pending Requests",
      value: "15",
      change: "+4 from yesterday",
      icon: <FiClock />,
      className: "pending",
    },
    {
      id: 2,
      title: "Approved Requests",
      value: "42",
      change: "+12 from yesterday",
      icon: <FiCheckCircle />,
      className: "approved",
    },
    {
      id: 3,
      title: "Rejected Requests",
      value: "9",
      change: "-3 from yesterday",
      icon: <FiXCircle />,
      className: "rejected",
    },
    {
      id: 4,
      title: "Total Refund Amount",
      value: "$12,500",
      change: "+8.5% from last month",
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

            <span className={stat.className}>{stat.change}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RefundStats;
