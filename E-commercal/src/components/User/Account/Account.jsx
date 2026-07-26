import "./Account.css";
import { Link, Outlet } from "react-router-dom";
import AccountSidebar from "./Sections/AccountSidebar/AccountSidebar";

const Account = () => {
  return (
    <section className="account-page">
      <div className="account-container">
        <div className="account-header">
          <Link to="/">Home</Link>
          <span>/ My Account</span>

          <h1>My Account</h1>

          <p>
            Manage your profile information, orders and addresses from one
            place.
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
