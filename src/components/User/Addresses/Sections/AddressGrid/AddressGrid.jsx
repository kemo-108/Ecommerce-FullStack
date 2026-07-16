import "./AddressGrid.css";
import AddressCard from "../AddressCard/AddressCard";

const AddressGrid = () => {
  const addresses = [
    {
      id: 1,
      type: "Home",
      default: true,
      name: "Kemo Mostafa",
      phone: "+20 1012345678",
      address: "15 El Tahrir Street",
      city: "Nasr City",
      governorate: "Cairo",
      country: "Egypt",
      postalCode: "11765",
    },
    {
      id: 2,
      type: "Work",
      default: false,
      name: "Kemo Mostafa",
      phone: "+20 1098765432",
      address: "Business District",
      city: "New Cairo",
      governorate: "Cairo",
      country: "Egypt",
      postalCode: "11835",
    },
  ];

  return (
    <div className="address-grid">
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} />
      ))}
    </div>
  );
};

export default AddressGrid;
