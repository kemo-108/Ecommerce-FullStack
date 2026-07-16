import "./RefundDetails.css";
import {
  FiX,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiShoppingBag,
  FiDollarSign,
} from "react-icons/fi";

const RefundDetails = ({ onClose }) => {
  return (
    <div className="refund-details-overlay">
      <div className="refund-details">
        <div className="refund-details-header">
          <div>
            <h2>Refund Details</h2>
            <span>#RF-10254</span>
          </div>

          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="details-section">
          <h3>
            <FiUser />
            Customer Information
          </h3>

          <div className="details-card">
            <p>
              <strong>Name:</strong> Ahmed Mohamed
            </p>
            <p>
              <strong>Email:</strong> ahmed@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +20 1012345678
            </p>
          </div>
        </div>

        <div className="details-section">
          <h3>
            <FiShoppingBag />
            Order Information
          </h3>

          <div className="details-card">
            <p>
              <strong>Order ID:</strong> #ORD-10245
            </p>
            <p>
              <strong>Product:</strong> Nike Air Max 270
            </p>
            <p>
              <strong>Quantity:</strong> 2
            </p>
            <p>
              <strong>Reason:</strong> Wrong Size
            </p>
          </div>
        </div>

        <div className="details-section">
          <h3>Description</h3>

          <div className="details-card">
            Customer received the wrong size and requested a refund.
          </div>
        </div>

        <div className="details-section">
          <h3>Status Timeline</h3>

          <div className="timeline">
            <div className="timeline-item active">
              <FiCheckCircle />
              Request Submitted
            </div>

            <div className="timeline-item active">
              <FiClock />
              Under Review
            </div>

            <div className="timeline-item">
              <FiCheckCircle />
              Approved
            </div>

            <div className="timeline-item">
              <FiDollarSign />
              Refunded
            </div>
          </div>
        </div>

        <div className="refund-footer">
          <button className="approve-btn">Approve</button>

          <button className="reject-btn">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RefundDetails;
