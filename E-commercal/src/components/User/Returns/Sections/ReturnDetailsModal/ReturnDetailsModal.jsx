import "./ReturnDetailsModal.css";
import {
  FiX,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPackage,
} from "react-icons/fi";

const ReturnDetailsModal = ({ setOpenModal }) => {
  return (
    <div className="return-modal-overlay">
      <div className="return-modal">
        <div className="return-modal-header">
          <div>
            <h2>Return Details</h2>
            <span>#RT10254</span>
          </div>

          <button onClick={() => setOpenModal(false)}>
            <FiX />
          </button>
        </div>

        <div className="return-info">
          <div className="info-card">
            <span>Order ID</span>
            <h4>#ORD10254</h4>
          </div>

          <div className="info-card">
            <span>Request Date</span>
            <h4>15 Jul 2026</h4>
          </div>

          <div className="info-card">
            <span>Status</span>

            <div className="status processing">
              <FiClock />
              Processing
            </div>
          </div>
        </div>

        <div className="returned-products">
          <h3>
            <FiPackage />
            Returned Products
          </h3>

          <div className="returned-item">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
              alt=""
            />

            <div>
              <h4>Nike Air Max 270</h4>

              <p>Qty : 1</p>

              <span>Total : $180</span>
            </div>
          </div>
        </div>

        <div className="return-reason">
          <h3>Reason</h3>

          <p>
            I received the wrong size and would like to return the product for a
            refund.
          </p>
        </div>

        <div className="timeline">
          <h3>Timeline</h3>

          <div className="timeline-item active">
            <FiCheckCircle />
            <span>Request Submitted</span>
          </div>

          <div className="timeline-item active">
            <FiClock />
            <span>Under Review</span>
          </div>

          <div className="timeline-item">
            <FiCheckCircle />
            <span>Approved</span>
          </div>

          <div className="timeline-item">
            <FiCheckCircle />
            <span>Refund Completed</span>
          </div>
        </div>

        <div className="admin-note">
          <h3>Admin Note</h3>

          <p>
            Your request is currently under review. We will update you within 24
            hours.
          </p>
        </div>

        <div className="modal-footer">
          <button className="cancel-request">
            <FiXCircle />
            Cancel Request
          </button>

          <button className="close-modal" onClick={() => setOpenModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnDetailsModal;
