import "./ReturnsFilters.css";
import { FiSearch } from "react-icons/fi";

const ReturnsFilters = () => {
  return (
    <div className="returns-filters">
      <div className="returns-search">
        <FiSearch />

        <input type="text" placeholder="Search by return or order ID..." />
      </div>

      <div className="returns-selects">
        <select>
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Completed</option>
        </select>

        <select>
          <option>Latest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default ReturnsFilters;
