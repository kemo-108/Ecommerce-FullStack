import "./OrderRow.css";
import { FiEye, FiRotateCw } from "react-icons/fi";

const OrderRow = ({ order, setSelectedOrder }) => {
  const firstItem = order.items?.[0];
  const totalQuantity =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const extraItemsCount = (order.items?.length || 0) - 1;

  return (
    <div className="order-row">
      <div className="order-product">
        <img src={firstItem?.imageUrl} alt={firstItem?.productName} />

        <div>
          <h4>
            {firstItem?.productName}
            {extraItemsCount > 0 && ` +${extraItemsCount} more`}
          </h4>

          <span>Qty : {totalQuantity}</span>
        </div>
      </div>

      <div className="order-id">#{order.orderId}</div>

      <div className="order-date">
        {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : ""}
      </div>

      <div className="order-total">${Number(order.total).toFixed(2)}</div>

      <div className={`order-status ${order.status?.toLowerCase()}`}>
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
