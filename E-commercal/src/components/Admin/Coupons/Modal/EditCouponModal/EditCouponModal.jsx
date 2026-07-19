import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./EditCouponModal.css";
import { toast } from "react-toastify";
import { updateCoupon } from "../../../../../services/CouponsService";

const EditCouponModal = ({ coupon, refreshCoupons, setOpenEditModal }) => {
  if (!coupon) return null;

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "Percentage",
    discountValue: "",
    minOrder: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrder: coupon.minOrder,
      maxDiscount: coupon.maxDiscount,
      usageLimit: coupon.usageLimit,
      expiryDate: coupon.expiryDate,
      status: coupon.status,
    });
  }, [coupon]);

  const closeModal = () => {
    setErrors({});
    setOpenEditModal(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.code.trim()) newErrors.code = "Coupon code is required.";

    if (!formData.description.trim())
      newErrors.description = "Description is required.";

    if (!formData.discountValue || Number(formData.discountValue) <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0.";
    }

    if (
      formData.discountType === "Percentage" &&
      Number(formData.discountValue) > 100
    ) {
      newErrors.discountValue = "Percentage cannot exceed 100%.";
    }

    if (!formData.minOrder) newErrors.minOrder = "Minimum order is required.";

    if (!formData.usageLimit) newErrors.usageLimit = "Usage limit is required.";

    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);
    try {
      await updateCoupon(coupon.id, {
        code: formData.code,
        description: formData.description,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        usageLimit: Number(formData.usageLimit),
        minOrder: Number(formData.minOrder),
        maxDiscount: Number(formData.maxDiscount) || 0,
        expiryDate: formData.expiryDate,
        status: formData.status,
      });
      toast.success("Coupon updated successfully.");
      await refreshCoupons();
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update coupon."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="edit-coupon-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Coupon</h2>

          <button onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="two-columns">
            <div className="form-group">
              <label>Coupon Code</label>

              <input
                name="code"
                value={formData.code}
                onChange={handleChange}
              />

              {errors.code && (
                <small className="error-text">{errors.code}</small>
              )}
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Scheduled</option>
                <option>Expired</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            {errors.description && (
              <small className="error-text">{errors.description}</small>
            )}
          </div>

          <div className="three-columns">
            <div className="form-group">
              <label>Discount Type</label>

              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
              >
                <option>Percentage</option>
                <option>Fixed Amount</option>
              </select>
            </div>

            <div className="form-group">
              <label>Discount Value</label>

              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleChange}
              />

              {errors.discountValue && (
                <small className="error-text">{errors.discountValue}</small>
              )}
            </div>

            <div className="form-group">
              <label>Minimum Order</label>

              <input
                type="number"
                name="minOrder"
                value={formData.minOrder}
                onChange={handleChange}
              />

              {errors.minOrder && (
                <small className="error-text">{errors.minOrder}</small>
              )}
            </div>
          </div>

          <div className="three-columns">
            <div className="form-group">
              <label>Maximum Discount</label>

              <input
                type="number"
                name="maxDiscount"
                value={formData.maxDiscount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Usage Limit</label>

              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleChange}
              />

              {errors.usageLimit && (
                <small className="error-text">{errors.usageLimit}</small>
              )}
            </div>

            <div className="form-group">
              <label>Expiry Date</label>

              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
              />

              {errors.expiryDate && (
                <small className="error-text">{errors.expiryDate}</small>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCouponModal;
