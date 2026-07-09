import "./RefundFilters.css";
import { FiSearch, FiRotateCcw } from "react-icons/fi";

const RefundFilters = () => {
  return (
    <div className="refund-filters">
      <div className="refund-search">
        <FiSearch />

        <input type="text" placeholder="Search by customer or order..." />
      </div>

      <select>
        <option>All Status</option>
        <option>Pending</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>

      <select>
        <option>All Reasons</option>
        <option>Wrong Item</option>
        <option>Damaged Product</option>
        <option>Changed Mind</option>
        <option>Missing Parts</option>
      </select>

      <select>
        <option>Last 30 Days</option>
        <option>Today</option>
        <option>This Week</option>
        <option>This Month</option>
        <option>This Year</option>
      </select>

      <button className="reset-btn">
        <FiRotateCcw />
        Reset
      </button>
    </div>
  );
};

export default RefundFilters;
