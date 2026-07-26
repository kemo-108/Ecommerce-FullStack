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

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  const isHome = address.type?.toLowerCase() === "home";

  return (
    <div className="address-card">
      <div className="address-card-header">
        <div className="address-type">
          {isHome ? <FiHome /> : <FiBriefcase />}
          <h3>{address.type}</h3>
        </div>

        {address.default ? (
          <span className="default-badge">
            <FiCheckCircle />
            Default
          </span>
        ) : (
          <button
            className="set-default-btn"
            onClick={() => onSetDefault(address.id)}
          >
            Set as default
          </button>
        )}
      </div>

      <div className="address-info">
        <h4>{address.name}</h4>

        <p>
          <FiMapPin />
          {address.addressLine}
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
        <button className="edit-btn" onClick={() => onEdit(address)}>
          <FiEdit2 />
          Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(address.id)}>
          <FiTrash2 />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
