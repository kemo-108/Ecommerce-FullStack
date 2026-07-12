import { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { createProduct } from "../../../../../services/ProductService";
import "./AddProductModal.css";

const AddProductModal = ({ setOpenAddModal, categories = [], onSaved }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    sku: "",
    weight: "",
    description: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";

    if (!formData.category) newErrors.category = "Category is required";

    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Enter a valid price";

    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = "Enter a valid stock";

    if (formData.images.length === 0)
      newErrors.images = "Please upload at least one image";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm() || saving) return;

    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("productName", formData.name);
      payload.append("category", formData.category);
      payload.append("brand", formData.brand);
      payload.append("price", formData.price);
      payload.append("discount", formData.discount || 0);
      payload.append("qty", formData.stock);
      payload.append("code", formData.sku);
      payload.append("weight", formData.weight || "");
      payload.append("description", formData.description);
      formData.images.forEach((file) => payload.append("images", file));

      await createProduct(payload);

      toast.success("Product added successfully.");
      onSaved?.();
      setOpenAddModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not add the product."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-product-modal">
        <div className="modal-header">
          <h2>Add Product</h2>

          <button
            className="close-modal"
            onClick={() => setOpenAddModal(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="modal-content">
          <div className="upload-section">
            <div className="upload-box">
              <input
                id="upload-image"
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleImage}
              />

              {previewImages.length === 0 ? (
                <label htmlFor="upload-image" className="upload-content">
                  <FiUploadCloud />
                  <h4>Upload Images</h4>
                  <p>Drag & Drop or Click</p>
                </label>
              ) : (
                <div className="image-preview">
                  {previewImages.map((image, index) => (
                    <div className="preview-card" key={index}>
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>

                      <img src={image.url} alt={`Preview ${index + 1}`} />
                    </div>
                  ))}

                  <label htmlFor="upload-image" className="add-more-image">
                    <FiUploadCloud />
                    <span>Add</span>
                  </label>
                </div>
              )}
            </div>

            {errors.images && (
              <span className="error-text">{errors.images}</span>
            )}
          </div>

          <div className="form-section">
            <div className="input-group">
              <label>Product Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
              />

              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="double-input">
              <div className="input-group">
                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id || cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Stationery">Stationery</option>
                      <option value="Art Supplies">Art Supplies</option>
                      <option value="Office">Office</option>
                    </>
                  )}
                </select>

                {errors.category && (
                  <span className="error-text">{errors.category}</span>
                )}
              </div>

              <div className="input-group">
                <label>Brand</label>

                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                />
              </div>
            </div>

            <div className="double-input">
              {" "}
              <div className="input-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                />

                {errors.price && (
                  <span className="error-text">{errors.price}</span>
                )}
              </div>
              <div className="input-group">
                <label>Discount %</label>

                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="10"
                />
              </div>
            </div>

            <div className="double-input">
              <div className="input-group">
                <label>Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                />

                {errors.stock && (
                  <span className="error-text">{errors.stock}</span>
                )}
              </div>

              <div className="input-group">
                <label>SKU</label>

                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="PRD-001"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Weight (Kg)</label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="1.5"
              />
            </div>

            <div className="input-group">
              <label>Description</label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write product description..."
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={() => setOpenAddModal(false)}>
            Cancel
          </button>

          <button className="save-btn" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
