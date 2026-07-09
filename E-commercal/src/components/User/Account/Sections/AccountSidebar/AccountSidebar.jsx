import "./AccountSidebar.css";
import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiShield,
  FiLogOut,
} from "react-icons/fi";

const AccountSidebar = () => {
  return (
    <aside className="account-sidebar">
      <div className="account-user">
        <div className="account-avatar">
          <img src="https://i.pravatar.cc/150?img=12" alt="User" />
        </div>

        <h3>Kemo Mostafa</h3>
        <p>kemo@example.com</p>
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
          to="/account/wishlist"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FiHeart />
          <span>Wishlist</span>
        </NavLink>
        <NavLink
          to="/account/returns"
          className={({ isActive }) =>
            isActive ? "menu-link active" : "menu-link"
          }
        >
          <FiHeart />
          <span>returns</span>
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

      <button className="logout-btn">
        <FiLogOut />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default AccountSidebar;
