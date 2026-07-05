import { FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./DeleteProductModal.css";

const DeleteProductModal = ({ product, setOpenDeleteModal }) => {
  const handleDelete = async () => {
    if (!product) return;

    try {
      // هنربط الـ API هنا بعدين
      // await deleteProduct(product.productId);

      toast.success("Product deleted successfully.");

      setOpenDeleteModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
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
            className="cancel-btn"
            onClick={() => setOpenDeleteModal(false)}
          >
            <FiX />
            Cancel
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
