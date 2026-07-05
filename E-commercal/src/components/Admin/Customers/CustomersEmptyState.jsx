import { FiUsers, FiRefreshCw } from "react-icons/fi";
import "./CustomersEmptyState.css";

const CustomersEmptyState = ({
  setSearchTerm,
  setSelectedStatus,
  setSelectedType,
}) => {
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("All Status");
    setSelectedType("All Types");
  };

  return (
    <div className="customers-empty">
      <div className="customers-empty-icon">
        <FiUsers />
      </div>

      <h2>No Customers Found</h2>

      <p>We couldn't find any customers matching your search or filters.</p>

      <button className="clear-filters-btn" onClick={clearFilters}>
        <FiRefreshCw />
        Clear Filters
      </button>
    </div>
  );
};

export default CustomersEmptyState;
