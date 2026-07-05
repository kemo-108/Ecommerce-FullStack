import {
  FiX,
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiDollarSign,
  FiAward,
} from "react-icons/fi";

import "./ViewCustomerModal.css";

const ViewCustomerModal = ({
  customer,
  setOpenViewModal,
  setOpenEditModal,
}) => {
  if (!customer) return null;

  return (
    <div className="modal-overlay">
      <div className="view-customer-modal">
        {/* Header */}

        <div className="customer-cover">
          <button
            className="close-modal"
            onClick={() => setOpenViewModal(false)}
          >
            <FiX />
          </button>

          <div className="customer-avatar-wrapper">
            <img src={customer.avatar} alt={customer.customerName} />

            <span
              className={`online-dot ${customer.status.toLowerCase()}`}
            ></span>
          </div>

          <h2>
            {customer.customerName}

            {customer.type === "VIP" && (
              <span className="vip-badge">⭐ VIP</span>
            )}
          </h2>

          <p>{customer.email}</p>
        </div>

        {/* Information */}

        <div className="customer-info-grid">
          <div className="info-card">
            <FiMail />

            <div>
              <span>Email</span>

              <h4>{customer.email}</h4>
            </div>
          </div>

          <div className="info-card">
            <FiPhone />

            <div>
              <span>Phone</span>

              <h4>{customer.phone}</h4>
            </div>
          </div>

          <div className="info-card">
            <FiMapPin />

            <div>
              <span>Address</span>

              <h4>{customer.address || "Cairo, Egypt"}</h4>
            </div>
          </div>

          <div className="info-card">
            <FiAward />

            <div>
              <span>Status</span>

              <h4>
                <span className={`status ${customer.status.toLowerCase()}`}>
                  {customer.status}
                </span>
              </h4>
            </div>
          </div>
        </div>

        {/* Statistics */}

        <div className="customer-stats-box">
          <div className="customer-stat-card orders">
            <div className="customer-stat-icon">
              <FiPackage />
            </div>

            <div>
              <h3>{customer.totalOrders}</h3>

              <p>Total Orders</p>
            </div>
          </div>

          <div className="customer-stat-card revenue">
            <div className="customer-stat-icon">
              <FiDollarSign />
            </div>

            <div>
              <h3>${customer.totalSpent.toLocaleString()}</h3>

              <p>Total Spent</p>
            </div>
          </div>

          <div className="customer-stat-card vip">
            <div className="customer-stat-icon">
              <FiAward />
            </div>

            <div>
              <h3>{customer.type}</h3>

              <p>Customer Type</p>
            </div>
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
              setOpenEditModal(true);
            }}
          >
            <FiEdit2 />
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerModal;
