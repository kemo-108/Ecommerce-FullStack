import "./DeletenventoryModal.css";

import { FiAlertTriangle, FiX } from "react-icons/fi";

const DeleteInventoryModal = ({ product, onClose, onDelete }) => {
  if (!product) return null;

  const handleDelete = () => {
    onDelete(product.productId);
  };

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="delete-icon">
          <FiAlertTriangle />
        </div>

        <h2>Delete Product</h2>

        <p>
          Are you sure you want to delete
          <strong> {product.name}</strong> ?
        </p>

        <span>This action cannot be undone.</span>

        <div className="delete-product-info">
          <img src={product.imageUrl} alt={product.name} />

          <div>
            <h4>{product.name}</h4>

            <small>{product.sku}</small>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInventoryModal;
