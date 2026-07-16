import { useState } from "react";
import "./Addresses.css";

import AddressGrid from "./Sections/AddressGrid/AddressGrid";
import AddAddressModal from "./Sections/AddAddressModal/AddAddressModal";

import { FiPlus } from "react-icons/fi";

const Addresses = () => {
  const [openModal, setOpenModal] = useState(false);

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

        <AddressGrid />
      </div>

      {openModal && <AddAddressModal setOpenModal={setOpenModal} />}
    </>
  );
};

export default Addresses;
