import "./AddressSection.css";
import { FiEdit2, FiMapPin, FiTrash2, FiPlus } from "react-icons/fi";

const AddressSection = () => {
  return (
    <section className="address-section">
      <div className="section-header">
        <div>
          <h2>My Addresses</h2>
          <p>Manage your shipping addresses.</p>
        </div>

        <button className="add-address-btn">
          <FiPlus />
          Add Address
        </button>
      </div>

      <div className="address-grid">
        <div className="address-card">
          <div className="address-title">
            <h3>Home</h3>

            <span>Default</span>
          </div>

          <div className="address-body">
            <FiMapPin />

            <p>
              25 Salah Salem Street,
              <br />
              Nasr City,
              <br />
              Cairo, Egypt
            </p>
          </div>

          <div className="address-actions">
            <button>
              <FiEdit2 />
              Edit
            </button>

            <button>
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
