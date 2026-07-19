import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiPercent,
  FiDollarSign,
} from "react-icons/fi";

import "./CouponRow.css";

const CouponRow = ({
  coupon,
  setSelectedCoupon,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  const usagePercentage = (coupon.usage / coupon.usageLimit) * 100;

  return (
    <tr>
      {/* Coupon */}

      <td>
        <div className="coupon-cell">
          <div className="coupon-avatar">{coupon.code.charAt(0)}</div>

          <div className="coupon-details">
            <h4>{coupon.code}</h4>

            <p>{coupon.description}</p>
          </div>
        </div>
      </td>

      {/* Discount */}

      <td>
        <div className="discount-box">
          <span
            className={`discount-badge ${
              coupon.discountType === "Percentage" ? "percentage" : "fixed"
            }`}
          >
            {coupon.discountType === "Percentage" ? (
              <>
                <FiPercent />
                {coupon.discountValue}%
              </>
            ) : (
              <>
                <FiDollarSign />
                {coupon.discountValue}
              </>
            )}
          </span>

          <small>Min Order ${coupon.minOrder}</small>
        </div>
      </td>

      {/* Usage */}

      <td>
        <div className="usage-box">
          <div className="usage-text">
            <span>{coupon.usage}</span>

            <span>/ {coupon.usageLimit}</span>
          </div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${usagePercentage}%`,
              }}
            ></div>
          </div>
        </div>
      </td>

      {/* Validity */}

      <td>
        <div className="validity-box">
          <h5>
            {coupon.expiryDate
              ? new Date(coupon.expiryDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </h5>

          <span>Expiry Date</span>
        </div>
      </td>

      {/* Status */}

      <td>
        <span className={`coupon-status ${coupon.status.toLowerCase()}`}>
          <span className="status-dot"></span>

          {coupon.status}
        </span>
      </td>

      {/* Actions */}

      <td>
        <div className="coupon-actions">
          <button
            className="view-btn"
            onClick={() => {
              setSelectedCoupon(coupon);
              setOpenViewModal(true);
            }}
          >
            <FiEye />
          </button>

          <button
            className="edit-btn"
            onClick={() => {
              setSelectedCoupon(coupon);
              setOpenEditModal(true);
            }}
          >
            <FiEdit />
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setSelectedCoupon(coupon);
              setOpenDeleteModal(true);
            }}
          >
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CouponRow;
