import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./EditInventoryModal.css";

const EditInventoryModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    warehouse: "",
    supplier: "",
    price: "",
    stock: "",
    minStock: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        warehouse: product.warehouse,
        supplier: product.supplier,
        price: product.price,
        stock: product.stock,
        minStock: product.minStock,
        description: product.description,
      });
    }
  }, [product]);

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
      ...product,
      ...formData,
    });
  };

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-inventory-modal">
        <div className="modal-header">
          <h2>Edit Product</h2>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>SKU</label>

              <input
                type="text"
                name="sku"
                value={formData.sku}
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
              <label>Supplier</label>

              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Current Stock</label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Minimum Stock</label>

              <input
                type="number"
                name="minStock"
                value={formData.minStock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInventoryModal;
