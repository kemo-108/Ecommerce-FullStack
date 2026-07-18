import { useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { deleteProduct } from "../../../../../services/ProductService";
import "./DeleteProductModal.css";

const DeleteProductModal = ({ product, setOpenDeleteModal, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!product || !product.productId || deleting) return;

    setDeleting(true);

    try {
      await deleteProduct(product.productId);

      toast.success("Product deleted successfully.");

      onDeleted?.();

      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Delete Product Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Failed to delete product.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <div className="delete-icon">
          <FiTrash2 />
        </div>

        <h2>Delete Product</h2>

        <p>
          Are you sure you want to delete
          <strong> {product?.productName}</strong>?
        </p>

        <span>This action cannot be undone.</span>

        <div className="delete-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setOpenDeleteModal(false)}
            disabled={deleting}
          >
            <FiX />
            Cancel
          </button>

          <button
            type="button"
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

export default DeleteProductModal;
