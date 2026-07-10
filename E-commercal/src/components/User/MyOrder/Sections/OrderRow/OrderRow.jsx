import "./OrderRow.css";
import { FiEye, FiRotateCw } from "react-icons/fi";

const OrderRow = ({ order, setSelectedOrder }) => {
  return (
    <div className="order-row">
      <div className="order-product">
        <img src={order.image} alt={order.product} />

        <div>
          <h4>{order.product}</h4>

          <span>Qty : {order.quantity}</span>
        </div>
      </div>

      <div className="order-id">{order.id}</div>

      <div className="order-date">{order.date}</div>

      <div className="order-total">${Number(order.total).toFixed(2)}</div>

      <div className={`order-status ${order.status.toLowerCase()}`}>
        {order.status}
      </div>

      <div className="order-actions">
        <button className="view-btn" onClick={() => setSelectedOrder(order)}>
          <FiEye />
        </button>

        <button className="again-btn" title="Buy Again">
          <FiRotateCw />
        </button>
      </div>
    </div>
  );
};

export default OrderRow;
