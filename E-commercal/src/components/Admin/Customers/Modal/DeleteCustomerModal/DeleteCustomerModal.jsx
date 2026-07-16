import { FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./DeleteCustomerModal.css";

const DeleteCustomerModal = ({
  customer,
  customers,
  setCustomers,
  setOpenDeleteModal,
}) => {
  setCustomers(
    customers.filter((item) => item.customerId !== customer.customerId),
  );

  toast.success("Customer deleted successfully.");

  setOpenDeleteModal(false);

  if (!customer) return null;

  return (
    <div className="modal-overlay">
      <div className="delete-customer-modal">
        <div className="delete-icon">
          <FiTrash2 />
        </div>

        <h2>Delete Customer</h2>

        <p>
          Are you sure you want to delete
          <strong> {customer.customerName}</strong>?
        </p>

        <span>This action cannot be undone.</span>

        <div className="customer-preview">
          <img src={customer.avatar} alt={customer.customerName} />

          <div>
            <h4>{customer.customerName}</h4>

            <p>{customer.email}</p>
          </div>
        </div>

        <div className="delete-actions">
          <button
            className="cancel-btn"
            onClick={() => setOpenDeleteModal(false)}
          >
            <FiX />
            Cancel
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;
