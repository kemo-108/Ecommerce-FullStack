import { useState } from "react";
import { FiUser, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./AddCustomerModal.css";
import { createCustomer } from "../../../../../services/CustomersService";

const AddCustomerModal = ({ setOpenAddModal, refreshCustomers }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      await createCustomer(formData);
      toast.success("Customer added successfully.");
      await refreshCustomers();
      setOpenAddModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add customer."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-customer-modal">
        <div className="modal-header">
          <h2>Add Customer</h2>

          <button
            className="close-modal"
            onClick={() => setOpenAddModal(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="modal-content">
          {/* Avatar */}

          <div className="avatar-section">
            <div className="avatar-upload">
              <FiUser />
            </div>
          </div>

          {/* Form */}

          <div className="customer-form">
            <div className="double-input">
              <div className="input-group">
                <label>Customer Name</label>

                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                />

                {errors.customerName && (
                  <span className="error-text">{errors.customerName}</span>
                )}
              </div>

              <div className="input-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
            </div>
            <div className="double-input">
              <div className="input-group">
                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>

              <div className="input-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={() => setOpenAddModal(false)}>
            Cancel
          </button>

          <button className="save-btn" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save Customer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
