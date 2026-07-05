import {
  FiX,
  FiEdit2,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiMapPin,
} from "react-icons/fi";

import "./ViewOrderModal.css";

const ViewOrderModal = ({ order, setOpenViewModal, setOpenStatusModal }) => {
  if (!order) return null;

  const status = order.status?.toLowerCase();

  const pendingActive = ["pending", "processing", "delivered"].includes(status);

  const processingActive = ["processing", "delivered"].includes(status);

  const deliveredActive = status === "delivered";

  return (
    <div className="modal-overlay">
      <div className="view-order-modal">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2>Order #{order.orderId}</h2>
            <p>Customer Order Details</p>
          </div>

          <button
            className="close-modal"
            onClick={() => setOpenViewModal(false)}
          >
            <FiX />
          </button>
        </div>
        {/* Customer */}
        <div className="customer-card">
          {order.customerImage ? (
            <img src={order.customerImage} alt={order.customerName} />
          ) : (
            <div className="customer-avatar">
              {order.customerName.charAt(0)}
            </div>
          )}

          <div className="customer-info">
            <h3>{order.customerName}</h3>
            <p>{order.customerEmail}</p>
          </div>
        </div>
        {/* Timeline */}
        <div className="order-timeline">
          <div className={`timeline-step ${pendingActive ? "active" : ""}`}>
            <div className="timeline-icon">
              <FiClock />
            </div>

            <span>Pending</span>
          </div>

          <div
            className={`timeline-line ${processingActive ? "active" : ""}`}
          />

          <div className={`timeline-step ${processingActive ? "active" : ""}`}>
            <div className="timeline-icon">
              <FiTruck />
            </div>

            <span>Processing</span>
          </div>

          <div className={`timeline-line ${deliveredActive ? "active" : ""}`} />

          <div className={`timeline-step ${deliveredActive ? "active" : ""}`}>
            <div className="timeline-icon">
              <FiCheckCircle />
            </div>

            <span>Delivered</span>
          </div>
        </div>
        {/* Order Details */}
        <div className="order-details-grid">
          <div className="detail-card">
            <span>Status</span>

            <div className={`status-badge ${status}`}>{order.status}</div>
          </div>

          <div className="detail-card">
            <span>Payment</span>

            <div
              className={`payment-badge ${order.paymentStatus.toLowerCase()}`}
            >
              {order.paymentStatus}
            </div>
          </div>

          <div className="detail-card">
            <span>Order Date</span>

            <h4>{order.orderDate}</h4>
          </div>

          <div className="detail-card">
            <span>Total Amount</span>

            <h4>${order.total}</h4>
          </div>
        </div>{" "}
        {/* Shipping */}
        <div className="shipping-card">
          <h3>
            <FiMapPin />
            Shipping Address
          </h3>

          <p>{order.address || "No shipping address available."}</p>
        </div>
        {/* Notes */}
        <div className="notes-card">
          <h3>Order Notes</h3>

          <p>{order.notes || "No notes available."}</p>
        </div>
        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${order.subtotal || order.total}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>${order.shipping || 0}</strong>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <strong>${order.tax || 0}</strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <strong>${order.total}</strong>
          </div>
        </div>
        {/* Footer */}
        <div className="modal-footer">
          <button
            className="cancel-btn"
            onClick={() => setOpenViewModal(false)}
          >
            Close
          </button>

          <button
            className="save-btn"
            onClick={() => {
              setOpenViewModal(false);
              setOpenStatusModal(true);
            }}
          >
            <FiEdit2 />
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
