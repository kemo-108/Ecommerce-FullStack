import { useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./DeleteOrderModal.css";
import { DeleteOrder } from "../../../../../services/OrderService";

const DeleteOrderModal = ({ order, setOpenDeleteModal, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await DeleteOrder(order.orderId);
      toast.success("Order deleted successfully.");
      onDeleted?.();
      setOpenDeleteModal(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Could not delete order.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="delete-order-modal">
        <div className="delete-icon">
          <FiTrash2 />
        </div>

        <h2>Delete Order</h2>

        <p>
          Are you sure you want to delete
          <strong> Order #{order.orderId}</strong>?
        </p>

        <span>This action cannot be undone.</span>

        <div className="order-info-box">
          <h4>{order.customerName}</h4>

          <p>{order.customerEmail}</p>

          <strong>${order.total}</strong>
        </div>

        <div className="delete-actions">
          <button
            className="cancel-btn"
            onClick={() => setOpenDeleteModal(false)}
          >
            <FiX />
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={deleting}
          >
            <FiTrash2 />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOrderModal;
