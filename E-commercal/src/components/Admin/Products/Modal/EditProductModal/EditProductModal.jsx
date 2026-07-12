import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { updateProduct } from "../../../../../services/ProductService";
import "./EditProductModal.css";

const EditProductModal = ({ setOpenEditModal, product, categories = [], onSaved }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    brand: "",
    price: "",
    qty: "",
    imageUrl: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || "",
        category: product.category || "",
        brand: product.brand || "",
        price: product.price || "",
        qty: product.qty || "",
        imageUrl: product.imageUrl || "",
        description: product.description || "",
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price";
    }

    if (!formData.qty || Number(formData.qty) < 0) {
      newErrors.qty = "Enter a valid quantity";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || saving || !product) return;

    setSaving(true);
    try {
      await updateProduct(product.productId, formData);

      toast.success("Product updated successfully.");
      onSaved?.();
      setOpenEditModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not update the product."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-product-modal">
        <div className="modal-header">
          <h2>Edit Product</h2>

          <button
            className="close-modal"
            onClick={() => setOpenEditModal(false)}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Product Name</label>

              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />

              {errors.productName && (
                <span className="error-text">{errors.productName}</span>
              )}
            </div>

            <div className="input-group">
              <label>Category</label>

              {categories.length > 0 ? (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id || cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              )}
            </div>

            <div className="input-group">
              <label>Brand</label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Price</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />

              {errors.price && (
                <span className="error-text">{errors.price}</span>
              )}
            </div>

            <div className="input-group">
              <label>Quantity</label>

              <input
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
              />

              {errors.qty && <span className="error-text">{errors.qty}</span>}
            </div>

            <div className="input-group">
              <label>Image URL</label>

              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="input-group full-width">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenEditModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
