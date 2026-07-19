import { useState } from "react";
import { FiX } from "react-icons/fi";
import "./AddOrderModal.css";
import { toast } from "react-toastify";
import { AdminCreateOrder } from "../../../../../services/OrderService";

const AddOrderModal = ({ setOpenAddModal, refreshOrders }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    total: "",
    paymentStatus: "Pending",
    status: "Pending",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    try {
      // Note: this quick-create form doesn't collect line items yet,
      // so the order is created with just a total and no item breakdown.
      await AdminCreateOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        total: Number(formData.total),
        paymentStatus: formData.paymentStatus,
        status: formData.status,
        items: [],
      });
      toast.success("Order created successfully.");
      await refreshOrders();
      setOpenAddModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create order."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setOpenAddModal(false)}>
      <div className="add-order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Order</h2>

          <button onClick={() => setOpenAddModal(false)}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name</label>

            <input
              type="text"
              name="customerName"
              placeholder="Enter customer name"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Customer Email</label>

            <input
              type="email"
              name="customerEmail"
              placeholder="Enter customer email"
              value={formData.customerEmail}
              onChange={handleChange}
            />
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label>Total Amount</label>

              <input
                type="number"
                name="total"
                placeholder="0.00"
                value={formData.total}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Payment Status</label>

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>Paid</option>
                <option>Failed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Order Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenAddModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Creating..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
