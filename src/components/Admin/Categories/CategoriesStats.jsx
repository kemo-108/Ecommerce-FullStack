import { FiGrid, FiCheckCircle, FiPackage, FiStar } from "react-icons/fi";

import "./CategoriesStats.css";

const CategoriesStats = ({ categories }) => {
  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (c) => c.status === "Active",
  ).length;

  const featuredCategories = categories.filter((c) => c.featured).length;

  const totalProducts = categories.reduce((sum, c) => sum + c.products, 0);

  const stats = [
    {
      title: "Total Categories",
      value: totalCategories,
      sub: "+2 this month",
      icon: <FiGrid />,
      color: "pink",
    },
    {
      title: "Active Categories",
      value: activeCategories,
      sub: `${Math.round(
        (activeCategories / totalCategories) * 100,
      )}% of total`,
      icon: <FiCheckCircle />,
      color: "green",
    },
    {
      title: "Products in Categories",
      value: totalProducts,
      sub: "All categories",
      icon: <FiPackage />,
      color: "blue",
    },
    {
      title: "Featured Categories",
      value: featuredCategories,
      sub: `${Math.round(
        (featuredCategories / totalCategories) * 100,
      )}% of total`,
      icon: <FiStar />,
      color: "yellow",
    },
  ];

  return (
    <div className="categories-stats">
      {stats.map((item, index) => (
        <div className="category-stat-card" key={index}>
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

export default CategoriesStats;
