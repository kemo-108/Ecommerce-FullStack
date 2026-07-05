import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";
import "./CustomerRow.css";

const CustomerRow = ({
  customer,
  setSelectedCustomer,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
}) => {
  return (
    <tr>
      <td className="customer-column">
        <div className="customer-info">
          <div className="customer-avatar-wrapper">
            <img src={customer.avatar} alt={customer.customerName} />

            <span
              className={`customer-online ${customer.status.toLowerCase()}`}
            ></span>
          </div>

          <div className="customer-details">
            <h4>
              {customer.customerName}

              {customer.type === "VIP" && (
                <span className="vip-badge">⭐ VIP</span>
              )}

              {customer.type === "New" && (
                <span className="new-badge">NEW</span>
              )}
            </h4>

            <p>
              <FiMail />
              {customer.email}
            </p>

            <small>
              <FiPhone />
              {customer.phone}
            </small>
          </div>
        </div>
      </td>

      <td>
        <span className="orders-badge">
          <FiPackage />
          {customer.totalOrders} Orders
        </span>
      </td>

      <td>
        <span className="spent-badge">
          <FiDollarSign />${customer.totalSpent.toLocaleString()}
        </span>
      </td>

      <td>
        <span className={`status ${customer.status.toLowerCase()}`}>
          {customer.status}
        </span>
      </td>

      <td>{customer.joined}</td>

      <td>
        <div className="actions">
          <button
            className="view-btn"
            onClick={() => {
              setSelectedCustomer(customer);
              setOpenViewModal(true);
            }}
          >
            <FiEye />
          </button>

          <button
            className="edit-btn"
            onClick={() => {
              setSelectedCustomer(customer);
              setOpenEditModal(true);
            }}
          >
            <FiEdit />
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setSelectedCustomer(customer);
              setOpenDeleteModal(true);
            }}
          >
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;
