import { useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./UpdateOrderStatusModal.css";
import { UpdateOrderStatus } from "../../../../../services/OrderService";

const UpdateOrderStatusModal = ({ order, setOpenStatusModal, onSaved }) => {
  const [status, setStatus] = useState(order?.status || "Pending");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await UpdateOrderStatus(order.orderId, status);
      toast.success("Order status updated successfully.");
      onSaved?.();
      setOpenStatusModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not update order status."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="update-status-modal">
        <div className="modal-header">
          <h2>Update Order Status</h2>

          <button
            className="close-modal"
            onClick={() => setOpenStatusModal(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="status-content">
          <div className="status-info">
            <span>Order ID</span>

            <h3>#{order.orderId}</h3>
          </div>

          <div className="status-info">
            <span>Customer</span>

            <h3>{order.customerName}</h3>
          </div>

          <div className="status-info">
            <span>Current Status</span>

            <div className={`status-badge ${order.status.toLowerCase()}`}>
              {order.status}
            </div>
          </div>

          <div className="status-select">
            <label>New Status</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cancel-btn"
            onClick={() => setOpenStatusModal(false)}
          >
            Cancel
          </button>

          <button className="save-btn" onClick={handleSave} disabled={saving}>
            <FiSave />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderStatusModal;
