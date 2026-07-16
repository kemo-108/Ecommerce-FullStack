import { useState } from "react";
import { FiX } from "react-icons/fi";
import "./AddOrderModal.css";

const AddOrderModal = ({ setOpenAddModal }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    total: "",
    paymentStatus: "Pending",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Later

    setOpenAddModal(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setOpenAddModal(false)}>
      <div className="add-order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Order</h2>

          <button onClick={() => setOpenAddModal(false)}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name</label>

            <input
              type="text"
              name="customerName"
              placeholder="Enter customer name"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Customer Email</label>

            <input
              type="email"
              name="customerEmail"
              placeholder="Enter customer email"
              value={formData.customerEmail}
              onChange={handleChange}
            />
          </div>

          <div className="two-columns">
            <div className="form-group">
              <label>Total Amount</label>

              <input
                type="number"
                name="total"
                placeholder="0.00"
                value={formData.total}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Payment Status</label>

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
              >
                <option>Pending</option>
                <option>Paid</option>
                <option>Failed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Order Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenAddModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
