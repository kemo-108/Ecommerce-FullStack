import {
  FiX,
  FiPackage,
  FiCalendar,
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";

import "./ViewCategoryModal.css";

const ViewCategoryModal = ({ category, setOpenViewModal }) => {
  if (!category) return null;

  return (
    <div className="modal-overlay" onClick={() => setOpenViewModal(false)}>
      <div className="view-category-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}

        <div className="modal-header">
          <h2>Category Details</h2>

          <button onClick={() => setOpenViewModal(false)}>
            <FiX />
          </button>
        </div>

        {/* Body */}

        <div className="modal-body">
          <div className="category-preview">
            <img
              src={
                category.image?.startsWith("http")
                  ? category.image
                  : `https://localhost:7069/${category.image}`
              }
              alt={category.name}
            />

            <div>
              <h2>{category.name}</h2>

              <p>{category.description}</p>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <FiPackage />

              <div>
                <span>Products</span>
                <h4>{category.products}</h4>
              </div>
            </div>

            <div className="detail-card">
              <FiStar />

              <div>
                <span>Featured</span>
                <h4>{category.featured ? "Yes" : "No"}</h4>
              </div>
            </div>

            <div className="detail-card">
              <FiCheckCircle />

              <div>
                <span>Status</span>
                <h4>{category.status}</h4>
              </div>
            </div>

            <div className="detail-card">
              <FiCalendar />

              <div>
                <span>Created</span>
                <h4>{category.createdAt}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="modal-footer">
          <button onClick={() => setOpenViewModal(false)}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewCategoryModal;
