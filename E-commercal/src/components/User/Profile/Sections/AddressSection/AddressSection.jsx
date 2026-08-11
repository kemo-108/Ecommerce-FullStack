import { useCallback, useEffect, useState } from "react";
import "./AddressSection.css";
import {
  FiEdit2,
  FiMapPin,
  FiTrash2,
  FiPlus,
  FiCheckCircle,
} from "react-icons/fi";
import {
  GetMyAddresses,
  DeleteAddress,
  SetDefaultAddress,
} from "../../../../../services/AddressService";
import AddAddressModal from "../../../Addresses/Sections/AddAddressModal/AddAddressModal";
import { toast } from "react-toastify";

const AddressSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const loadAddresses = useCallback(() => {
    setLoading(true);
    GetMyAddresses()
      .then((data) => setAddresses(Array.isArray(data) ? data : []))
      .catch(() => toast.error("Failed to load addresses"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setEditingAddress(null);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditingAddress(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await DeleteAddress(id);
      toast.success("Address deleted");
      loadAddresses();
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await SetDefaultAddress(id);
      loadAddresses();
    } catch {
      toast.error("Failed to set default address");
    }
  };

  return (
    <section className="address-section">
      <div className="section-header">
        <div>
          <h2>My Addresses</h2>
          <p>Manage your shipping addresses.</p>
        </div>

        <button className="add-address-btn" onClick={handleAdd}>
          <FiPlus />
          Add Address
        </button>
      </div>

      {loading && <p className="address-status">Loading addresses...</p>}

      {!loading && addresses.length === 0 && (
        <p className="address-status">No addresses saved yet.</p>
      )}

      {!loading && addresses.length > 0 && (
        <div className="address-grid">
          {addresses.map((address) => (
            <div className="address-card" key={address.id}>
              <div className="address-title">
                <h3 style={{ textTransform: "capitalize" }}>{address.type}</h3>

                {address.default ? (
                  <span>
                    <FiCheckCircle />
                    Default
                  </span>
                ) : (
                  <button
                    className="set-default-btn"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as default
                  </button>
                )}
              </div>

              <div className="address-body">
                <FiMapPin />

                <p>
                  {address.name && (
                    <>
                      {address.name}
                      <br />
                    </>
                  )}
                  {address.addressLine},
                  <br />
                  {address.city}
                  {address.governorate ? `, ${address.governorate}` : ""}
                  <br />
                  {address.country}
                  {address.postalCode ? ` - ${address.postalCode}` : ""}
                  {address.phone && (
                    <>
                      <br />
                      {address.phone}
                    </>
                  )}
                </p>
              </div>

              <div className="address-actions">
                <button onClick={() => handleEdit(address)}>
                  <FiEdit2 />
                  Edit
                </button>

                <button onClick={() => handleDelete(address.id)}>
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {openModal && (
        <AddAddressModal
          setOpenModal={closeModal}
          editingAddress={editingAddress}
          onSaved={loadAddresses}
        />
      )}
    </section>
  );
};

export default AddressSection;
