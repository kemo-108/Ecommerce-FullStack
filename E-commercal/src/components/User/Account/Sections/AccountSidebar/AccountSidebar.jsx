import "./AccountSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiRotateCcw,
  FiMapPin,
  FiShield,
  FiLogOut,
} from "react-icons/fi";
import { GetCurrentUser, Logout, ClearSession } from "../../../../../services/AuthService";
import { toast } from "react-toastify";

const AccountSidebar = () => {
  const navigate = useNavigate();
  const user = GetCurrentUser();

  const handleLogout = async () => {
    try {
      await Logout();
    } catch (error) {
      console.error(error);
    } finally {
      ClearSession();
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  return (
    <aside className="account-sidebar">
      <div className="account-user">
        <div className="account-avatar">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt={user?.name || "User"}
          />
        </div>

        <h3>{user?.name || "Guest"}</h3>
        <p>{user?.email || ""}</p>
      </div>

      <nav className="account-menu">
        <NavLink
          to="/account/profile"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FiUser />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/account/orders"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FiShoppingBag />
          <span>My Orders</span>
        </NavLink>

        <NavLink
          to="/account/returns"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FiRotateCcw />
          <span>Returns</span>
        </NavLink>

        <NavLink
          to="/account/addresses"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FiMapPin />
          <span>Addresses</span>
        </NavLink>

        <NavLink
          to="/account/security"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FiShield />
          <span>Security</span>
        </NavLink>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default AccountSidebar;
