import "./RefundFilters.css";
import { FiSearch, FiRotateCcw } from "react-icons/fi";

const RefundFilters = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedReason,
  setSelectedReason,
  onReset,
}) => {
  return (
    <div className="refund-filters">
      <div className="refund-search">
        <FiSearch />

        <input
          type="text"
          placeholder="Search by customer or order..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option>All Status</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>

      <select
        value={selectedReason}
        onChange={(e) => setSelectedReason(e.target.value)}
      >
        <option>All Reasons</option>
        <option>Wrong Item</option>
        <option>Wrong Size</option>
        <option>Wrong Product</option>
        <option>Damaged Item</option>
        <option>Damaged Product</option>
        <option>Changed Mind</option>
        <option>Missing Parts</option>
      </select>

      <button className="reset-btn" onClick={onReset} type="button">
        <FiRotateCcw />
        Reset
      </button>
    </div>
  );
};

export default RefundFilters;
