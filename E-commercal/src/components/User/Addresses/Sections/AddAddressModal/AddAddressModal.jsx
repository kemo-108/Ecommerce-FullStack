import { useState } from "react";
import "./AddAddressModal.css";
import { FiX } from "react-icons/fi";
import {
  CreateAddress,
  UpdateAddress,
} from "../../../../../services/AddressService";
import { toast } from "react-toastify";

const AddAddressModal = ({ setOpenModal, editingAddress, onSaved }) => {
  const isEditing = Boolean(editingAddress);

  const [form, setForm] = useState({
    name: editingAddress?.name || "",
    type: editingAddress?.type || "home",
    phone: editingAddress?.phone || "",
    country: editingAddress?.country || "",
    city: editingAddress?.city || "",
    governorate: editingAddress?.governorate || "",
    postalCode: editingAddress?.postalCode || "",
    addressLine: editingAddress?.addressLine || "",
    default: editingAddress?.default || false,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) {
        await UpdateAddress(editingAddress.id, form);
        toast.success("Address updated");
      } else {
        await CreateAddress(form);
        toast.success("Address added");
      }
      onSaved();
      setOpenModal();
    } catch {
      toast.error("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="address-modal">
        <div className="modal-header">
          <h2>{isEditing ? "Edit Address" : "Add New Address"}</h2>

          <button className="close-btn" onClick={() => setOpenModal()}>
            <FiX />
          </button>
        </div>

        <form className="address-form" onSubmit={handleSubmit}>
          <div className="input-group full">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Address Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+20 10xxxxxxxx"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Governorate</label>
            <input
              type="text"
              name="governorate"
              placeholder="Governorate"
              value={form.governorate}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
            />
          </div>

          <div className="input-group full">
            <label>Address Line</label>
            <input
              type="text"
              name="addressLine"
              placeholder="Street Address"
              value={form.addressLine}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              id="default"
              name="default"
              checked={form.default}
              onChange={handleChange}
            />
            <label htmlFor="default">Set as Default Address</label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenModal()}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
