import { FiPlus } from "react-icons/fi";
import "./CustomersHeader.css";

const CustomersHeader = ({ setOpenAddModal }) => {
  return (
    <div className="add-customer-header">
      <div>
        <h2>Customers</h2>
        <p>Manage your customers</p>
      </div>

      <button
        className="add-customer-btn"
        onClick={() => setOpenAddModal(true)}
      >
        <FiPlus />
        Add Customer
      </button>
    </div>
  );
};

export default CustomersHeader;
