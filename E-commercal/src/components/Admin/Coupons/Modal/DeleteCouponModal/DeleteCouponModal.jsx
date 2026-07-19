import { useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import "./DeleteCouponModal.css";
import { toast } from "react-toastify";
import { deleteCoupon } from "../../../../../services/CouponsService";

const DeleteCouponModal = ({ coupon, refreshCoupons, setOpenDeleteModal }) => {
  if (!coupon) return null;

  const [deleting, setDeleting] = useState(false);

  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCoupon(coupon.id);
      toast.success("Coupon deleted successfully.");
      await refreshCoupons();
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete coupon."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="delete-coupon-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Coupon</h2>

          <button type="button" className="close-btn" onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <div className="delete-content">
          <div className="delete-icon">
            <FiAlertTriangle />
          </div>

          <h3>Delete Confirmation</h3>

          <p>
            Are you sure you want to delete
            <strong> "{coupon.code}" </strong>?
          </p>

          <span>This action cannot be undone.</span>
        </div>

        <div className="delete-actions">
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button type="button" className="delete-btn" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete Coupon"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCouponModal;
