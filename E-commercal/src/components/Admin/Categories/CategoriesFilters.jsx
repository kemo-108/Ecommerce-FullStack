import "./CategoriesFilters.css";
import { FiSearch, FiFilter, FiCheck, FiStar } from "react-icons/fi";

const CategoriesFilters = () => {
  return (
    <div className="categories-filters">
      <div className="search-box">
        <FiSearch />
        <input type="text" placeholder="Search categories..." />
      </div>

      <div className="filter-group">
        <label>
          <FiCheck />
          <span>Status</span>
        </label>

        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>Hidden</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <FiStar />
          <span>Featured</span>
        </label>

        <select>
          <option>All</option>
          <option>Featured</option>
          <option>Not Featured</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>

        <select>
          <option>Newest</option>
          <option>Oldest</option>
          <option>Name A-Z</option>
          <option>Name Z-A</option>
        </select>
      </div>

      <button className="filter-btn">
        <FiFilter />
        Filter
      </button>
    </div>
  );
};

export default CategoriesFilters;
