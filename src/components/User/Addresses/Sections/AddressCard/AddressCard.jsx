import "./AddressCard.css";
import {
  FiHome,
  FiBriefcase,
  FiPhone,
  FiMapPin,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

const AddressCard = ({ address }) => {
  return (
    <div className="address-card">
      <div className="address-card-header">
        <div className="address-type">
          {address.type === "Home" ? <FiHome /> : <FiBriefcase />}
          <h3>{address.type}</h3>
        </div>

        {address.default && (
          <span className="default-badge">
            <FiCheckCircle />
            Default
          </span>
        )}
      </div>

      <div className="address-info">
        <h4>{address.name}</h4>

        <p>
          <FiMapPin />
          {address.address}
        </p>

        <p>
          <FiMapPin />
          {address.city}, {address.governorate}
        </p>

        <p>
          <FiMapPin />
          {address.country} - {address.postalCode}
        </p>

        <p>
          <FiPhone />
          {address.phone}
        </p>
      </div>

      <div className="address-actions">
        <button className="edit-btn">
          <FiEdit2 />
          Edit
        </button>

        <button className="delete-btn">
          <FiTrash2 />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
