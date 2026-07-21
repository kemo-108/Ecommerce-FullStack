import { useNavigate } from "react-router-dom";
import "./QuickActions.css";
import { FaBoxOpen, FaShoppingCart, FaUsers, FaChartBar } from "react-icons/fa";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Product",
      icon: <FaBoxOpen />,
      onClick: () => navigate("/admin/products"),
    },
    {
      title: "View Orders",
      icon: <FaShoppingCart />,
      onClick: () => navigate("/admin/orders"),
    },
    {
      title: "View Customers",
      icon: <FaUsers />,
      onClick: () => navigate("/admin/customers"),
    },
    {
      title: "View Reports",
      icon: <FaChartBar />,
      onClick: () => navigate("/admin/reports"),
    },
  ];

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>

      <div className="actions-grid">
        {actions.map((action, index) => (
          <div className="action-card" key={index} onClick={action.onClick}>
            <div className="action-icon">{action.icon}</div>

            <span>{action.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
