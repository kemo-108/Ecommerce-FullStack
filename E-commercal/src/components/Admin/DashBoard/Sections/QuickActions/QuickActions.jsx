import "./QuickActions.css";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaWallet,
  FaMoneyBillWave,
} from "react-icons/fa";

const actions = [
  {
    title: "Add Product",
    icon: <FaBoxOpen />,
  },
  {
    title: "Create Order",
    icon: <FaShoppingCart />,
  },
  {
    title: "Add Customer",
    icon: <FaUsers />,
  },
  {
    title: "View Reports",
    icon: <FaChartBar />,
  },
  {
    title: "Add Expense",
    icon: <FaWallet />,
  },
  {
    title: "Manage Debts",
    icon: <FaMoneyBillWave />,
  },
];

const QuickActions = () => {
  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>

      <div className="actions-grid">
        {actions.map((action, index) => (
          <div className="action-card" key={index}>
            <div className="action-icon">{action.icon}</div>

            <span>{action.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
