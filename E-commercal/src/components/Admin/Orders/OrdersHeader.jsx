import { FiPlus } from "react-icons/fi";
import "./OrdersHeader.css";

const OrdersHeader = ({ setOpenAddModal }) => {
  return (
    <div className="orders-header">
      <div className="orders-header-content">
        <div>
          <h1>Orders</h1>
          <p>Manage all customer orders</p>
        </div>

        <button className="add-order-btn" onClick={() => setOpenAddModal(true)}>
          <FiPlus />
          <span>Create Order</span>
        </button>
      </div>
    </div>
  );
};

export default OrdersHeader;
