import { useState } from "react";
import { FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./DeleteCustomerModal.css";
import { deleteCustomer } from "../../../../../services/CustomersService";

const DeleteCustomerModal = ({
  customer,
  refreshCustomers,
  setOpenDeleteModal,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCustomer(customer.customerId);
      toast.success("Customer deleted successfully.");
      await refreshCustomers();
      setOpenDeleteModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete customer."
      );
    } finally {
      setDeleting(false);
    }
  };

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

          <button className="delete-btn" onClick={handleDelete} disabled={deleting}>
            <FiTrash2 />
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;
