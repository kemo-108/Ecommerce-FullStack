import "./Sidebar.css";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTags,
  FaTicketAlt,
  FaWarehouse,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <h2>Admin</h2>
      </div>

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaHome />
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        to="/admin/products"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaBoxOpen />
        <span>Products</span>
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaShoppingCart />
        <span>Orders</span>
      </NavLink>

      <NavLink
        to="/admin/customers"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaUsers />
        <span>Customers</span>
      </NavLink>

      <NavLink
        to="/admin/category"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaTags />
        <span>Category</span>
      </NavLink>

      <NavLink
        to="/admin/coupons"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaTicketAlt />
        <span>Coupons</span>
      </NavLink>

      <NavLink
        to="/admin/inventory"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaWarehouse />
        <span>Inventory</span>
      </NavLink>

      <NavLink
        to="/admin/reports"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaChartBar />
        <span>Reports</span>
      </NavLink>

      <NavLink
        to="/admin/settings"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        <FaCog />
        <span>Settings</span>
      </NavLink>

      <button className="logout-btn">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
