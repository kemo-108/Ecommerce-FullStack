import { useState } from "react";
import { FiX } from "react-icons/fi";
import "./AddCategoryModal.css";
import { toast } from "react-toastify";
import { createCategory } from "../../../../services/CategoryService";
const AddCategoryModal = ({ setOpenAddModal, refreshCategories }) => {
  const initialState = {
    name: "",
    description: "",
    status: "Active",
    featured: false,
    image: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const closeModal = () => {
    setFormData(initialState);
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

    if (
      formData.image.trim() &&
      !/^https?:\/\/.+\..+/.test(formData.image.trim())
    ) {
      newErrors.image = "Please enter a valid image URL.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);
    try {
      await createCategory({
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: formData.image.trim() || "https://via.placeholder.com/150",
        featured: formData.featured,
        status: formData.status,
      });
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
            <label>Image URL</label>

            <input
              type="text"
              name="image"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
            />

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
