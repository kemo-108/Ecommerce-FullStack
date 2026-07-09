import "./Account.css";
import { Outlet } from "react-router-dom";
import AccountSidebar from "./Sections/AccountSidebar/AccountSidebar";

const Account = () => {
  return (
    <section className="account-page">
      <div className="account-container">
        <div className="account-header">
          <span>Home / My Account</span>

          <h1>My Account</h1>

          <p>
            Manage your profile information, orders and wishlist from one place.
          </p>
        </div>

        <div className="account-content">
          <AccountSidebar />

          <div className="account-outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
