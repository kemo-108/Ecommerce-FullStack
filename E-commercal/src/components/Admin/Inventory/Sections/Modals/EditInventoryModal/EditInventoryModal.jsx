import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./EditInventoryModal.css";

const EditInventoryModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    sku: "",
    barcode: "",
    minStock: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku || "",
        barcode: product.barcode || "",
        minStock: product.minStock ?? "",
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
      id: product.id,
      productId: product.productId,
      sku: formData.sku,
      barcode: formData.barcode,
      minStock: Number(formData.minStock),
    });
  };

  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-inventory-modal">
        <div className="modal-header">
          <h2>Edit Inventory Details</h2>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Product</label>
              <input type="text" value={product.name} disabled />
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
              <label>Barcode</label>

              <input
                type="text"
                name="barcode"
                value={formData.barcode}
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
