import {
  FiUsers,
  FiUserCheck,
  FiAward,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

import "./CustomersStats.css";

const CustomersStats = ({ customers }) => {
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const vipCustomers = customers.filter(
    (customer) => customer.type === "VIP",
  ).length;

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0,
  );

  const activeRate = totalCustomers
    ? Math.round((activeCustomers / totalCustomers) * 100)
    : 0;

  const vipRate = totalCustomers
    ? Math.round((vipCustomers / totalCustomers) * 100)
    : 0;

  const revenueTarget = 50000;
  const revenueRate = Math.min(
    100,
    Math.round((totalRevenue / revenueTarget) * 100),
  );

  const cards = [
    {
      icon: <FiUsers />,
      value: totalCustomers,
      title: "Total Customers",
      subtitle: "+124 New Customers",
      progress: 88,
      trend: "+12%",
      className: "total",
    },
    {
      icon: <FiUserCheck />,
      value: activeCustomers,
      title: "Active Customers",
      subtitle: `${activeRate}% Active`,
      progress: activeRate,
      trend: "+6%",
      className: "active",
    },
    {
      icon: <FiAward />,
      value: vipCustomers,
      title: "VIP Customers",
      subtitle: `${vipRate}% Premium`,
      progress: vipRate,
      trend: "+3%",
      className: "vip",
    },
    {
      icon: <FiDollarSign />,
      value: `$${totalRevenue.toLocaleString()}`,
      title: "Revenue",
      subtitle: "Generated Revenue",
      progress: revenueRate,
      trend: "+18%",
      className: "revenue",
    },
  ];

  return (
    <div className="customers-stats">
      {cards.map((card, index) => (
        <div className={`customer-stat-card ${card.className}`} key={index}>
          <div className="card-number">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="card-top">
            <div className="customer-stat-icon">{card.icon}</div>

            <div className="trend-badge">
              <FiTrendingUp />
              {card.trend}
            </div>
          </div>

          <div className="card-body">
            <h2>{card.value}</h2>

            <p>{card.title}</p>
          </div>

          <div className="progress-bar">
            <span
              style={{
                width: `${card.progress}%`,
              }}
            ></span>
          </div>

          <div className="card-footer">
            <small>{card.subtitle}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomersStats;
