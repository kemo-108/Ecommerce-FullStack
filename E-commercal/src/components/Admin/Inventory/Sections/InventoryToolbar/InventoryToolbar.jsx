import "./InventoryToolbar.css";

import { FiPlus, FiSearch } from "react-icons/fi";

import useInventory from "../../hooks/useInventory";
import { setSearch } from "../../reducer/inventoryActions";

const InventoryToolbar = () => {
  const { search, dispatch } = useInventory();

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="inventory-toolbar">
      <div className="inventory-search">
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by product name or SKU..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <button className="restock-btn">
        <FiPlus />
        <span>Restock Product</span>
      </button>
    </div>
  );
};

export default InventoryToolbar;
