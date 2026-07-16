import "./AddAddressModal.css";
import { FiX } from "react-icons/fi";

const AddAddressModal = ({ setOpenModal }) => {
  return (
    <div className="modal-overlay">
      <div className="address-modal">
        <div className="modal-header">
          <h2>Add New Address</h2>

          <button className="close-btn" onClick={() => setOpenModal(false)}>
            <FiX />
          </button>
        </div>

        <form className="address-form">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>

          <div className="input-group full">
            <label>Phone Number</label>
            <input type="text" placeholder="+20 10xxxxxxxx" />
          </div>

          <div className="input-group">
            <label>Country</label>
            <input type="text" placeholder="Country" />
          </div>

          <div className="input-group">
            <label>City</label>
            <input type="text" placeholder="City" />
          </div>

          <div className="input-group">
            <label>State</label>
            <input type="text" placeholder="State" />
          </div>

          <div className="input-group">
            <label>Postal Code</label>
            <input type="text" placeholder="Postal Code" />
          </div>

          <div className="input-group full">
            <label>Address Line</label>
            <input type="text" placeholder="Street Address" />
          </div>

          <div className="input-group full">
            <label>Additional Details</label>
            <textarea rows="4" placeholder="Apartment, Building, Landmark..." />
          </div>

          <div className="checkbox">
            <input type="checkbox" id="default" />
            <label htmlFor="default">Set as Default Address</label>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
