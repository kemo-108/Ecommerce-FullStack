import { FiGrid, FiList } from "react-icons/fi";
import "./CategoriesTable.css";
import CategoryRow from "./CategoryRow";

const CategoriesTable = ({
  categories,
  setSelectedCategory,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  return (
    <div className="categories-table-container">
      {/* Header */}

      <div className="table-top">
        <div className="table-info">
          <h3>Categories</h3>
          <p>
            Showing <strong>{categories.length}</strong> Categories
          </p>
        </div>

        <div className="table-view">
          <span>View:</span>

          <button className="active">
            <FiList />
          </button>

          <button>
            <FiGrid />
          </button>
        </div>
      </div>

      {/* Table */}

      <table className="categories-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Products</th>
            <th>Featured</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              setSelectedCategory={setSelectedCategory}
              setOpenViewModal={setOpenViewModal}
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
