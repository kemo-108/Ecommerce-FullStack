import { FiSearch, FiFilter, FiPercent, FiCheckCircle } from "react-icons/fi";

import "./CouponsFilters.css";

const CouponsFilters = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="coupons-filters">
      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          placeholder="Search coupon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>
          <FiCheckCircle />
          Status
        </label>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Scheduled</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <FiPercent />
          Discount Type
        </label>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option>All Types</option>
          <option>Percentage</option>
          <option>Fixed Amount</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <FiFilter />
          Sort By
        </label>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Newest</option>
          <option>Code A-Z</option>
          <option>Code Z-A</option>
          <option>Highest Discount</option>
          <option>Lowest Discount</option>
        </select>
      </div>

      <button className="filter-btn">
        <FiFilter />
        Filter
      </button>
    </div>
  );
};

export default CouponsFilters;
