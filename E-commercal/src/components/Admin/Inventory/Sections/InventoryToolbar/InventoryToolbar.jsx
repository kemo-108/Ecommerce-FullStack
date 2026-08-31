import "./InventoryToolbar.css";

import { FiPlus, FiSearch, FiPrinter } from "react-icons/fi";

import useInventory from "../../hooks/useInventory";
import { setSearch } from "../../reducer/inventoryActions";
import { printStocktakeSheet } from "../../utils/printStocktakeSheet";

const InventoryToolbar = () => {
  const { search, dispatch, openAddModal, filteredProducts } = useInventory();

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handlePrintStocktake = () => {
    // Uses filteredProducts (not the paginated slice) so printing respects
    // whatever warehouse/category/status filter is active - e.g. filter
    // to one warehouse first if you're only counting that location today -
    // but still includes every matching item, not just the current page.
    printStocktakeSheet(filteredProducts);
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

      <button className="print-stocktake-btn" onClick={handlePrintStocktake}>
        <FiPrinter />
        <span>Print Stocktake Sheet</span>
      </button>

      <button className="restock-btn" onClick={openAddModal}>
        <FiPlus />
        <span>Add Product</span>
      </button>
    </div>
  );
};

export default InventoryToolbar;
