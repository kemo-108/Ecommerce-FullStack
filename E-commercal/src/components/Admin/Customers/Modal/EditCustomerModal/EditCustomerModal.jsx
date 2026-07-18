import { useState } from "react";
import { FiSave, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./EditCustomerModal.css";
import { updateCustomer } from "../../../../../services/CustomersService";

const EditCustomerModal = ({
  customer,
  refreshCustomers,
  setOpenEditModal,
}) => {
  const [formData, setFormData] = useState({
    customerName: customer?.customerName || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    status: customer?.status || "Active",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCustomer(customer.customerId, formData);
      toast.success("Customer updated successfully.");
      await refreshCustomers();
      setOpenEditModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update customer."
      );
    } finally {
      setSaving(false);
    }
  };

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
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenEditModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              <FiSave />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;
