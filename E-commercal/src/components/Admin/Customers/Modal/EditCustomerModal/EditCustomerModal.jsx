import { useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./EditCustomerModal.css";

const EditCustomerModal = ({
  customer,
  customers,
  setCustomers,
  setOpenEditModal,
}) => {
  const [formData, setFormData] = useState({
    customerName: customer?.customerName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    address: customer?.address || "",
    status: customer?.status || "Active",
    type: customer?.type || "Regular",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  setCustomers(
    customers.map((item) =>
      item.customerId === customer.customerId
        ? {
            ...item,
            customerName: formData.customerName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            status: formData.status,
            type: formData.type,
          }
        : item,
    ),
  );

  toast.success("Customer updated successfully.");

  setOpenEditModal(false);

  return (
    <div className="modal-overlay">
      <div className="edit-customer-modal">
        <div className="modal-header">
          <h2>Edit Customer</h2>

          <button
            className="close-modal"
            onClick={() => setOpenEditModal(false)}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Customer Name</label>

              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Address</label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Blocked</option>
              </select>
            </div>

            <div className="input-group">
              <label>Customer Type</label>

              <select name="type" value={formData.type} onChange={handleChange}>
                <option>Regular</option>
                <option>VIP</option>
                <option>New</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenEditModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              <FiSave />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;
