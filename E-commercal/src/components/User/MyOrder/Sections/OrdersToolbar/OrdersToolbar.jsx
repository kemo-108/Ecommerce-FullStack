import "./OrdersToolbar.css";
import { FiSearch } from "react-icons/fi";

const OrdersToolbar = () => {
  return (
    <div className="orders-toolbar">
      <div className="toolbar-title">
        <h2>My Orders</h2>
        <p>Track, manage and review your recent orders.</p>
      </div>

      <div className="toolbar-actions">
        <div className="search-box">
          <FiSearch />

          <input type="text" placeholder="Search Order..." />
        </div>

        <select>
          <option>All Orders</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
        <select>
          <option>Latest</option>

          <option>Oldest</option>

          <option>Highest Price</option>

          <option>Lowest Price</option>
        </select>
      </div>
    </div>
  );
};

export default OrdersToolbar;
