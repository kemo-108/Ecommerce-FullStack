import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./EditCategoryModal.css";
import { toast } from "react-toastify";
const EditCategoryModal = ({ category, setCategories, setOpenEditModal }) => {
  if (!category) return null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
    featured: false,
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      featured: category.featured,
      image: category.image,
    });
  }, [category]);

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

    if (formData.image && !/^https?:\/\/.+\..+/.test(formData.image)) {
      newErrors.image = "Invalid image url.";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setCategories((prev) =>
      prev.map((item) =>
        item.id === category.id
          ? {
              ...item,
              ...formData,
            }
          : item,
      ),
    );

    closeModal();
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
            <label>Image URL</label>

            <input
              name="image"
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

            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
