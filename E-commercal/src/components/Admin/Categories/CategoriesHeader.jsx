import { FiPlus } from "react-icons/fi";
import "./CategoriesHeader.css";

const CategoriesHeader = ({ setOpenAddModal }) => {
  return (
    <div className="categories-header">
      <div className="categories-header-content">
        <div>
          <h1>Categories</h1>
          <p>Manage your product categories</p>
        </div>

        <button
          className="add-category-btn"
          onClick={() => setOpenAddModal(true)}
        >
          <FiPlus />
          <span>Add Category</span>
        </button>
      </div>
    </div>
  );
};

export default CategoriesHeader;
