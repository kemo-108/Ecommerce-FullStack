import { useEffect, useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import { updateProduct } from "../../../../../services/ProductService";
import { getCategories } from "../../../../../services/CategoryService";

import "./EditProductModal.css";
import { getImageUrl } from "../../../../../utils/imageUrl";

const EditProductModal = ({ setOpenEditModal, product, onSaved }) => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    categoryId: "",
    brand: "",
    code: "",
    sku: "",
    price: "",
    cost: "",
    oldPrice: "",
    discount: "",
    description: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
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
      cost: product.cost || "",
      oldPrice: product.oldPrice || "",
      discount: product.discount || "",
      description: product.description || "",
      image: null,
    });

    if (product.imageUrl) {
      setPreviewImage(getImageUrl(product.imageUrl));
    }

    setColors(
      (product.colors || []).map((c) => ({
        name: c.name,
        hex: c.hexCode || "#000000",
        image: null,
        previewUrl: c.imageUrl ? getImageUrl(c.imageUrl) : "",
        existingImageUrl: c.imageUrl || "",
      })),
    );
    setSizes(
  (product.sizes || []).map((s) => ({ name: s.name }))
);
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
      [name]: value,
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
  const addColorRow = () => {
    setColors((prev) => [
      ...prev,
      {
        name: "",
        hex: "#000000",
        image: null,
        previewUrl: "",
        existingImageUrl: "",
      },
    ]);
  };

  const updateColorRow = (index, field, value) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    );
  };

  const handleColorImage = (index, file) => {
    if (!file) return;
    setColors((prev) =>
      prev.map((c, i) =>
        i === index
          ? { ...c, image: file, previewUrl: URL.createObjectURL(file) }
          : c,
      ),
    );
  };

  const removeColorRow = (index) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };
  const addSizeRow = () => setSizes((prev) => [...prev, { name: "" }]);
const updateSizeRow = (index, value) =>
  setSizes((prev) => prev.map((s, i) => (i === index ? { name: value } : s)));
const removeSizeRow = (index) => setSizes((prev) => prev.filter((_, i) => i !== index));
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
      payload.append("Cost", formData.cost || 0);
      payload.append("OldPrice", formData.oldPrice || 0);
      payload.append("Discount", formData.discount || 0);
      payload.append("Brand", formData.brand);
      payload.append("Code", formData.code);
      payload.append("Sku", formData.sku);
      payload.append("Description", formData.description);
      payload.append("CategoryId", formData.categoryId);

      // ارفع صورة جديدة فقط إذا المستخدم اختار واحدة
      if (formData.image) {
        payload.append("Images", formData.image);
      }
      colors.forEach((c) => {
        if (!c.name.trim()) return;
        payload.append("ColorNames", c.name);
        payload.append("ColorHexes", c.hex || "");
        payload.append("ColorImages", c.image || new File([], ""));
        payload.append(
          "ColorExistingImageUrls",
          c.image ? "" : c.existingImageUrl || "",
        );
      });
      sizes.forEach((s) => {
  if (!s.name.trim()) return;
  payload.append("SizeNames", s.name);
});
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
              <label>Cost Price</label>

              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
              />
              <span className="field-hint">
                What you paid per unit — used only for profit reports.
              </span>
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
              />
            </div>

            {/* 👇 NEW 👇 */}
            <div className="input-group full-width">
              <label>Colors (optional)</label>

              {colors.map((color, index) => (
                <div className="color-row" key={index}>
                  <input
                    type="text"
                    placeholder="Color name (e.g. Red)"
                    value={color.name}
                    onChange={(e) =>
                      updateColorRow(index, "name", e.target.value)
                    }
                  />

                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) =>
                      updateColorRow(index, "hex", e.target.value)
                    }
                  />

                  <label className="color-image-upload">
                    {color.previewUrl ? (
                      <img src={color.previewUrl} alt={color.name} />
                    ) : (
                      <FiUploadCloud />
                    )}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleColorImage(index, e.target.files[0])
                      }
                    />
                  </label>

                  <button
                    type="button"
                    className="remove-color-btn"
                    onClick={() => removeColorRow(index)}
                  >
                    <FiX />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="add-color-btn"
                onClick={addColorRow}
              >
                + Add Color
              </button>
            </div>
            {/* 👆 end new 👆 */}
            <div className="input-group full-width">
  <label>Sizes (optional)</label>

  {sizes.map((size, index) => (
    <div className="size-row" key={index}>
      <input
        type="text"
        placeholder="Size (e.g. 80m)"
        value={size.name}
        onChange={(e) => updateSizeRow(index, e.target.value)}
      />
      <button type="button" className="remove-color-btn" onClick={() => removeSizeRow(index)}>
        <FiX />
      </button>
    </div>
  ))}

  <button type="button" className="add-color-btn" onClick={addSizeRow}>
    + Add Size
  </button>
</div>
            <div className="input-group full-width">
              <label>Product Image</label>

              <input type="file" accept="image/*" onChange={handleImage} />

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="preview-image"
                />
              )}
            </div>
          </div>{" "}
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
