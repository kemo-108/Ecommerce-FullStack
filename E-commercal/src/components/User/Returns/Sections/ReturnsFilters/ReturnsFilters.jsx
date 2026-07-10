import "./ReturnsFilters.css";
import { FiSearch } from "react-icons/fi";

const ReturnsFilters = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="returns-filters">
      <div className="returns-search">
        <FiSearch />

        <input
          type="text"
          placeholder="Search by return or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="returns-selects">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Completed</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Latest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default ReturnsFilters;
