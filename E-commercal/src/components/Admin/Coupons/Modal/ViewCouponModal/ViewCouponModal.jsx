import {
  FiX,
  FiTag,
  FiPercent,
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiShoppingBag,
} from "react-icons/fi";

import "./ViewCouponModal.css";

const ViewCouponModal = ({ coupon, setOpenViewModal }) => {
  if (!coupon) return null;

  return (
    <div className="modal-overlay" onClick={() => setOpenViewModal(false)}>
      <div className="view-coupon-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Coupon Details</h2>

          <button onClick={() => setOpenViewModal(false)}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="coupon-preview">
            <div className="coupon-avatar">{coupon.code.charAt(0)}</div>

            <div>
              <h2>{coupon.code}</h2>
              <p>{coupon.description}</p>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <FiTag />

              <div>
                <span>Coupon Code</span>
                <h4>{coupon.code}</h4>
              </div>
            </div>

            <div className="detail-card">
              {coupon.discountType === "Percentage" ? (
                <FiPercent />
              ) : (
                <FiDollarSign />
              )}

              <div>
                <span>Discount</span>

                <h4>
                  {coupon.discountType === "Percentage"
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                </h4>
              </div>
            </div>

            <div className="detail-card">
              <FiShoppingBag />

              <div>
                <span>Minimum Order</span>
                <h4>${coupon.minOrder}</h4>
              </div>
            </div>

            <div className="detail-card">
              <FiCalendar />

              <div>
                <span>Expiry Date</span>
                <h4>{coupon.expiryDate}</h4>
              </div>
            </div>

            <div className="detail-card">
              <FiCheckCircle />

              <div>
                <span>Status</span>
                <h4>{coupon.status}</h4>
              </div>
            </div>

            <div className="detail-card">
              <FiTag />

              <div>
                <span>Usage</span>
                <h4>
                  {coupon.usage} / {coupon.usageLimit}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => setOpenViewModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCouponModal;
