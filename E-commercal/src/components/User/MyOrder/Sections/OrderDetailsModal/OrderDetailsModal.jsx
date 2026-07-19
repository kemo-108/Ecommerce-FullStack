import "./OrderDetailsModal.css";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
const OrderDetailsModal = ({ order, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  if (!order) return null;

  const totalQuantity =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-items">
          {order.items?.map((item, index) => (
            <div className="modal-product" key={index}>
              <img src={item.imageUrl} alt={item.productName} />

              <div>
                <h3>{item.productName}</h3>
                <p>
                  Qty {item.quantity} × ${Number(item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-grid">
          <div>
            <span>Order Date</span>
            <h4>
              {order.orderDate
                ? new Date(order.orderDate).toLocaleDateString()
                : ""}
            </h4>
          </div>

          <div>
            <span>Quantity</span>
            <h4>{totalQuantity}</h4>
          </div>

          <div>
            <span>Payment</span>
            <h4>{order.paymentStatus}</h4>
          </div>

          <div>
            <span>Status</span>
            <h4>{order.status}</h4>
          </div>
        </div>

        {order.address && (
          <div className="shipping-address">
            <h3>Shipping Address</h3>
            <p>{order.address}</p>
          </div>
        )}

        <div className="price-summary">
          <div>
            <span>Subtotal</span>
            <h4>${Number(order.subtotal).toFixed(2)}</h4>
          </div>

          <div>
            <span>Shipping</span>
            <h4>${Number(order.shipping).toFixed(2)}</h4>
          </div>

          <div>
            <span>Tax</span>
            <h4>${Number(order.tax).toFixed(2)}</h4>
          </div>

          <div className="grand-total">
            <span>Total</span>
            <h2>${Number(order.total).toFixed(2)}</h2>
          </div>
        </div>

        <div className="modal-footer">
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
