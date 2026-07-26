import { useState, useEffect, useCallback } from "react";
import "./Addresses.css";

import AddressGrid from "./Sections/AddressGrid/AddressGrid";
import AddAddressModal from "./Sections/AddAddressModal/AddAddressModal";

import { FiPlus } from "react-icons/fi";
import {
  GetMyAddresses,
  DeleteAddress,
  SetDefaultAddress,
} from "../../../services/AddressService";
import { toast } from "react-toastify";

const Addresses = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const closeModal = () => {
    setOpenModal(false);
    setEditingAddress(null);
  };

  return (
    <>
      <div className="addresses-page">
        <div className="addresses-header">
          <div>
            <h2>My Addresses</h2>
            <p>
              Manage your shipping and billing addresses for faster checkout.
            </p>
          </div>

          <button
            className="add-address-btn"
            onClick={() => setOpenModal(true)}
          >
            <FiPlus />
            Add Address
          </button>
        </div>

        {loading ? (
          <p className="addresses-status">Loading addresses...</p>
        ) : (
          <AddressGrid
            addresses={addresses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSetDefault={handleSetDefault}
          />
        )}
      </div>

      {openModal && (
        <AddAddressModal
          setOpenModal={closeModal}
          editingAddress={editingAddress}
          onSaved={loadAddresses}
        />
      )}
    </>
  );
};

export default Addresses;
