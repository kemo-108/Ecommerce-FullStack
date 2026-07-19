import { useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import "./DeleteCategoryModal.css";
import { toast } from "react-toastify";
import { deleteCategory } from "../../../../services/CategoryService";
const DeleteCategoryModal = ({
  category,
  refreshCategories,
  setOpenDeleteModal,
}) => {
  if (!category) return null;

  const [deleting, setDeleting] = useState(false);

  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCategory(category.id);
      toast.success("Category deleted successfully.");
      await refreshCategories();
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete category."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="delete-category-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Delete Category</h2>

          <button type="button" className="close-btn" onClick={closeModal}>
            <FiX />
          </button>
        </div>

        <div className="delete-content">
          <div className="delete-icon">
            <FiAlertTriangle />
          </div>

          <h3>Are you sure?</h3>

          <p>
            You are about to permanently delete
            <strong> "{category.name}" </strong>
            from your categories.
          </p>

          <span>This action cannot be undone.</span>
        </div>

        <div className="delete-actions">
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button type="button" className="delete-btn" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
