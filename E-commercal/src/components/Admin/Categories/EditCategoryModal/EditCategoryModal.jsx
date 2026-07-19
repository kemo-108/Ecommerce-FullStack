import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./EditCategoryModal.css";
import { toast } from "react-toastify";
import { updateCategory } from "../../../../services/CategoryService";

const EditCategoryModal = ({ category, onSaved, setOpenEditModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    featured: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        status: category.status || "Active",
        featured: !!category.featured,
      });
      setPreview(
        category.image ? `https://localhost:7069/${category.image}` : null
      );
    }
  }, [category]);

  if (!category) return null;

  const closeModal = () => {
    setErrors({});
    setOpenEditModal(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Minimum 3 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Minimum 10 characters.";
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

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
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

      await updateCategory(category.id, payload);

      toast.success("Category updated successfully.");
      onSaved?.();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Could not update the category."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="edit-category-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Category</h2>

          <button onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name</label>

            <input name="name" value={formData.name} onChange={handleChange} />

            {errors.name && <small className="error-text">{errors.name}</small>}
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
