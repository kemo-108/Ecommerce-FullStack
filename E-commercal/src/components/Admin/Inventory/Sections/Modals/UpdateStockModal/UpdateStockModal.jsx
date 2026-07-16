import { useEffect, useState } from "react";
import { FiPackage, FiX } from "react-icons/fi";
import "./UpdateStockModal.css";

const UpdateStockModal = ({ product, onClose, onSave }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      setQuantity(0);
    }
  }, [product]);

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...product,
      stock: Number(product.stock) + Number(quantity),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="update-stock-modal">
        <div className="modal-header">
          <h2>Update Stock</h2>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="product-info">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>

            <div>
              <h3>{product.name}</h3>

              <p>{product.sku}</p>
            </div>
          </div>

          <div className="stock-card">
            <div>
              <span>Current Stock</span>

              <h2>{product.stock}</h2>
            </div>

            <div>
              <span>Minimum Stock</span>

              <h2>{product.minStock}</h2>
            </div>
          </div>

          <div className="form-group">
            <label>Add Quantity</label>

            <div className="quantity-input">
              <FiPackage />

              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="new-stock">
            <span>New Stock</span>

            <strong>{Number(product.stock) + Number(quantity)}</strong>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStockModal;
