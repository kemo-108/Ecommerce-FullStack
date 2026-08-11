import { useState } from "react";
import { FiX, FiUpload } from "react-icons/fi";
import "./AddCategoryModal.css";
import { toast } from "react-toastify";
import { createCategory } from "../../../../services/CategoryService";

const AddCategoryModal = ({ setOpenAddModal, refreshCategories }) => {
  const initialState = {
    name: "",
    description: "",
    status: "Active",
    featured: false,
    image: null, // File
  };

  const [formData, setFormData] = useState(initialState);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const closeModal = () => {
    setFormData(initialState);
    setPreviewUrl("");
    setErrors({});
    setOpenAddModal(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Category name must be at least 3 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "featured" ? value === "true" : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewUrl(URL.createObjectURL(file));

    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("Name", formData.name.trim());
      payload.append("Description", formData.description.trim());
      payload.append("Featured", formData.featured);
      payload.append("Status", formData.status);
      if (formData.image) {
        payload.append("ImageFile", formData.image);
      }

      await createCategory(payload);
      toast.success("Category added successfully.");
      await refreshCategories();
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add category."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="add-category-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Category</h2>

          <button type="button" onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && <small className="error-text">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              placeholder="Enter category description"
              value={formData.description}
              onChange={handleChange}
            />

            {errors.description && (
              <small className="error-text">{errors.description}</small>
            )}
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>

            <div className="form-group">
              <label>Featured</label>

              <select
                name="featured"
                value={formData.featured.toString()}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Category Image</label>

            <input
              id="upload-category-image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />

            {previewUrl ? (
              <div className="category-image-preview">
                <img src={previewUrl} alt="Category preview" />
                <button type="button" onClick={removeImage}>
                  <FiX />
                </button>
              </div>
            ) : (
              <label htmlFor="upload-category-image" className="upload-content">
                <FiUpload />
                <span>Click to upload an image</span>
              </label>
            )}

            {errors.image && (
              <small className="error-text">{errors.image}</small>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
