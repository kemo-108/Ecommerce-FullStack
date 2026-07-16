import { FiEye, FiEdit2, FiTrash2, FiStar } from "react-icons/fi";
import "./CategoryRow.css";

const CategoryRow = ({
  category,
  setSelectedCategory,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  return (
    <tr>
      {/* Category */}

      <td>
        <div className="category-cell">
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
          />

          <div className="category-details">
            <h4>{category.name}</h4>
            <p>{category.description}</p>
          </div>
        </div>
      </td>

      {/* Products */}

      <td>
        <div className="products-box">
          <h4>{category.products}</h4>
          <span>Products</span>
        </div>
      </td>

      {/* Featured */}

      <td>
        <span className={`featured-badge ${category.featured ? "yes" : "no"}`}>
          <FiStar />
          {category.featured ? "Yes" : "No"}
        </span>
      </td>

      {/* Status */}

      <td>
        <span
          className={`status-badge ${
            category.status === "Active" ? "active" : "hidden"
          }`}
        >
          <span className="status-dot"></span>

          {category.status}
        </span>
      </td>

      {/* Created */}

      <td>
        <div className="created-box">
          <h5>{category.createdAt}</h5>
          <span>{category.createdTime}</span>
        </div>
      </td>

      {/* Actions */}

      <td>
        <div className="actions">
          <button
            className="view-btn"
            onClick={() => {
              setSelectedCategory(category);
              setOpenViewModal(true);
            }}
          >
            <FiEye />
          </button>

          <button
            className="edit-btn"
            onClick={() => {
              setSelectedCategory(category);
              setOpenEditModal(true);
            }}
          >
            <FiEdit2 />
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setSelectedCategory(category);
              setOpenDeleteModal(true);
            }}
          >
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
