import { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import "./AddCategoryModal.css";
import { toast } from "react-toastify";
import { createCategory } from "../../../../services/CategoryService";

const AddCategoryModal = ({ setOpenAddModal, onSaved }) => {
  const initialState = {
    name: "",
    description: "",
    status: "Active",
    featured: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const closeModal = () => {
    setFormData(initialState);
    setImage(null);
    setPreview(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate() || saving) return;

    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("Name", formData.name.trim());
      payload.append("Description", formData.description.trim());
      payload.append("Featured", formData.featured);
      payload.append("Status", formData.status);
      if (image) payload.append("Image", image);

      await createCategory(payload);

      toast.success("Category added successfully.");
      onSaved?.();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not add the category."
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
            <label>Image</label>

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img src={preview} alt="Preview" className="image-preview" />
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
