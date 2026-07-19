import { useState } from "react";
import { FiX } from "react-icons/fi";
import "./AddCouponModal.css";
import { toast } from "react-toastify";
import { createCoupon } from "../../../../../services/CouponsService";

const AddCouponModal = ({ setOpenAddModal, refreshCoupons }) => {
  const initialState = {
    code: "",
    description: "",
    discountType: "Percentage",
    discountValue: "",
    minOrder: "",
    maxDiscount: "",
    usageLimit: "",
    expiryDate: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const closeModal = () => {
    setFormData(initialState);
    setErrors({});
    setOpenAddModal(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required.";
    } else if (formData.code.trim().length < 4) {
      newErrors.code = "Minimum 4 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.discountValue) {
      newErrors.discountValue = "Discount value is required.";
    } else if (Number(formData.discountValue) <= 0) {
      newErrors.discountValue = "Must be greater than 0.";
    }

    if (!formData.minOrder) {
      newErrors.minOrder = "Minimum order is required.";
    }

    if (!formData.usageLimit) {
      newErrors.usageLimit = "Usage limit is required.";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required.";
    }

    if (
      formData.discountType === "Percentage" &&
      Number(formData.discountValue) > 100
    ) {
      newErrors.discountValue = "Percentage cannot exceed 100%.";
    }

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
      await createCoupon({
        code: formData.code.toUpperCase(),
        description: formData.description,
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        usageLimit: Number(formData.usageLimit),
        minOrder: Number(formData.minOrder),
        maxDiscount: Number(formData.maxDiscount) || 0,
        expiryDate: formData.expiryDate,
        status: formData.status,
      });
      toast.success("Coupon created successfully.");
      await refreshCoupons();
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create coupon."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="add-coupon-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Coupon</h2>

          <button type="button" onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="two-columns">
            <div className="form-group">
              <label>Coupon Code</label>

              <input
                type="text"
                name="code"
                placeholder="SUMMER25"
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
              placeholder="Coupon Description"
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
              {saving ? "Creating..." : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponModal;
