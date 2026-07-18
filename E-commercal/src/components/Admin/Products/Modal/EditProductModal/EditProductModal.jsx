import { useEffect, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import { updateProduct } from "../../../../../services/ProductService";
import { getCategories } from "../../../../../services/CategoryService";

import "./EditProductModal.css";

const EditProductModal = ({ setOpenEditModal, product, onSaved }) => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    brand: "",
    code: "",
    sku: "",
    price: "",
    oldPrice: "",
    discount: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (!product) return;

    setFormData({
      productName: product.productName || "",
      categoryId: product.categoryId || "",
      brand: product.brand || "",
      code: product.code || "",
      sku: product.sku || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      discount: product.discount || "",
      description: product.description || "",
      image: null,
    });

    if (product.imageUrl) {
      setPreviewImage(`https://localhost:7069${product.imageUrl}`);
    }
  }, [product]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Enter a valid price";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product || !validateForm() || saving) return;

    setSaving(true);

    try {
      const payload = new FormData();

      payload.append("ProductName", formData.productName);
      payload.append("Price", formData.price);
      payload.append("OldPrice", formData.oldPrice || 0);
      payload.append("Discount", formData.discount || 0);
      payload.append("Brand", formData.brand);
      payload.append("Code", formData.code);
      payload.append("Sku", formData.sku);
      payload.append("Description", formData.description);
      payload.append("CategoryId", formData.categoryId);

      // ارفع صورة جديدة فقط إذا المستخدم اختار واحدة
      if (formData.image) {
        payload.append("Image", formData.image);
      }

      // Debug
      console.log("Updating Product...");

      for (let pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      await updateProduct(product.productId, payload);

      toast.success("Product updated successfully.");

      onSaved?.();

      setOpenEditModal(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.title ||
          "Could not update the product.",
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

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <span className="error-text">{errors.categoryId}</span>
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
              <label>Code</label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>SKU</label>

              <input
                type="text"
                name="sku"
                value={formData.sku}
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
              <label>Old Price</label>

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Discount</label>

              <input
                type="number"
                name="discount"
                value={formData.discount}
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
                placeholder="Write product description..."
              />
            </div>

            <div className="input-group full-width">
              <label>Product Image</label>

              <input type="file" accept="image/*" onChange={handleImage} />

              {previewImage && (
                <div className="preview-wrapper">
                  <img
                    src={previewImage}
                    alt="Product Preview"
                    className="preview-image"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenEditModal(false)}
              disabled={saving}
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
