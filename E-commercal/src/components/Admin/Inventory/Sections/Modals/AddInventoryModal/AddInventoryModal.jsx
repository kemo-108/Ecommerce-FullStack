import { useState } from "react";
import { FiX } from "react-icons/fi";
import "./AddInventoryModal.css";

const initialFormData = {
  productId: "",
  sku: "",
  barcode: "",
  category: "",
  warehouse: "",
  stock: "",
  minStock: "",
};

const AddInventoryModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      productId: formData.productId,
      sku: formData.sku,
      barcode: formData.barcode,
      category: formData.category,
      warehouse: formData.warehouse,
      stock: Number(formData.stock),
      minStock: Number(formData.minStock),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="add-inventory-modal">
        <div className="modal-header">
          <h2>Add Product to Inventory</h2>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Product ID</label>

              <input
                type="text"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>SKU</label>

              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Barcode</label>

              <input
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Warehouse</label>

              <input
                type="text"
                name="warehouse"
                value={formData.warehouse}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Initial Stock</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Minimum Stock</label>

              <input
                type="number"
                name="minStock"
                value={formData.minStock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryModal;
