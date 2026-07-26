import "./AddressGrid.css";
import AddressCard from "../AddressCard/AddressCard";

const AddressGrid = ({ addresses, onEdit, onDelete, onSetDefault }) => {
  if (!addresses.length) {
    return <p className="addresses-status">No addresses saved yet.</p>;
  }

  return (
    <div className="address-grid">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
        />
      ))}
    </div>
  );
};

export default AddressGrid;
