import { useState } from "react";
import { FiUploadCloud, FiUser, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./AddCustomerModal.css";

const AddCustomerModal = ({ setOpenAddModal, customers, setCustomers }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
    type: "Regular",
    avatar: null,
    notes: "",
  });

  const [preview, setPreview] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      avatar: file,
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

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const newCustomer = {
    customerId: customers.length + 1,

    customerName: formData.customerName,

    email: formData.email,

    phone: formData.phone,

    address: formData.address,

    avatar: preview || "https://i.pravatar.cc/150",

    totalOrders: 0,

    totalSpent: 0,

    status: formData.status,

    type: formData.type,

    joined: new Date().toLocaleDateString(),
  };

  setCustomers((prev) => [...prev, newCustomer]);

  toast.success("Customer added successfully.");

  setOpenAddModal(false);

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
              {preview ? <img src={preview} alt="avatar" /> : <FiUser />}
            </div>

            <label htmlFor="avatar" className="upload-btn">
              <FiUploadCloud />
              Upload Photo
            </label>

            <input
              id="avatar"
              hidden
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
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
                <label>Address</label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <span className="error-text">{errors.address}</span>
                )}
              </div>
            </div>{" "}
            <div className="double-input">
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

              <div className="input-group">
                <label>Customer Type</label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Regular">Regular</option>
                  <option value="VIP">VIP</option>
                  <option value="New">New</option>
                </select>
              </div>
            </div>
            <div className="input-group full-width">
              <label>Notes</label>

              <textarea
                rows="5"
                name="notes"
                placeholder="Write customer notes..."
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={() => setOpenAddModal(false)}>
            Cancel
          </button>

          <button className="save-btn" onClick={handleSubmit}>
            Save Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
