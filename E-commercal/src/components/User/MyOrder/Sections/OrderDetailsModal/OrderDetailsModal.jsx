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

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="modal-product">
          <img src={order.image} alt={order.product} />

          <div>
            <h3>{order.product}</h3>

            <p>{order.id}</p>
          </div>
        </div>
        <div className="modal-grid">
          <div>
            <span>Order Date</span>
            <h4>{order.date}</h4>
          </div>

          <div>
            <span>Quantity</span>
            <h4>{order.quantity}</h4>
          </div>

          <div>
            <span>Payment</span>
            <h4>{order.payment}</h4>
          </div>

          <div>
            <span>Status</span>
            <h4>{order.status}</h4>
          </div>
        </div>
        <div className="shipping-address">
          <h3>Shipping Address</h3>

          <p>
            25 Salah Salem Street
            <br />
            Nasr City
            <br />
            Cairo, Egypt
          </p>
        </div>
        <div className="price-summary">
          <div>
            <span>Subtotal</span>
            <h4>${Number(order.total).toFixed(2)}</h4>
          </div>

          <div>
            <span>Shipping</span>
            <h4>$10</h4>
          </div>

          <div>
            <span>Tax</span>
            <h4>$5</h4>
          </div>

          <div className="grand-total">
            <span>Total</span>
            <h2>$195</h2>
          </div>
        </div>
        <div className="modal-footer">
          <button className="invoice-btn">Download Invoice</button>

          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
