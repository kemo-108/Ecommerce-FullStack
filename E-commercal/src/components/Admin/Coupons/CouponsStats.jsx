import { FiTag, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

import "./CouponsStats.css";

const CouponsStats = ({ coupons }) => {
  const totalCoupons = coupons.length;

  const activeCoupons = coupons.filter(
    (coupon) => coupon.status === "Active",
  ).length;

  const expiredCoupons = coupons.filter(
    (coupon) => coupon.status === "Expired",
  ).length;

  const totalSavings = coupons.reduce(
    (total, coupon) => total + coupon.discountValue,
    0,
  );

  const stats = [
    {
      title: "Total Coupons",
      value: totalCoupons,
      sub: "+2 this month",
      icon: <FiTag />,
      color: "pink",
    },
    {
      title: "Active Coupons",
      value: activeCoupons,
      sub: `${activeCoupons} Active`,
      icon: <FiCheckCircle />,
      color: "green",
    },
    {
      title: "Expired Coupons",
      value: expiredCoupons,
      sub: `${expiredCoupons} Expired`,
      icon: <FiClock />,
      color: "orange",
    },
    {
      title: "Total Savings",
      value: `$${totalSavings}`,
      sub: "Available Discounts",
      icon: <FiDollarSign />,
      color: "blue",
    },
  ];

  return (
    <div className="coupons-stats">
      {stats.map((item, index) => (
        <div className="coupon-stat-card" key={index}>
          <div className={`stat-icon ${item.color}`}>{item.icon}</div>

          <div className="stat-info">
            <h4>{item.title}</h4>

            <h2>{item.value}</h2>

            <span>{item.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CouponsStats;
