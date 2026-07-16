import "./InventoryFilters.css";

import { FiFilter } from "react-icons/fi";

import useInventory from "../../hooks/useInventory";

import {
  setStatus,
  setCategory,
  setWarehouse,
  setSort,
} from "../../reducer/inventoryActions";

const InventoryFilters = () => {
  const {
    status,
    category,
    warehouse,
    sortBy,
    categories,
    warehouses,
    dispatch,
  } = useInventory();

  return (
    <div className="inventory-filters">
      {/* Status */}
      <select
        value={status}
        onChange={(e) => dispatch(setStatus(e.target.value))}
      >
        <option value="All Status">All Status</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out Of Stock">Out Of Stock</option>
      </select>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Warehouse */}
      <select
        value={warehouse}
        onChange={(e) => dispatch(setWarehouse(e.target.value))}
      >
        {warehouses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="lastUpdated">Last Updated</option>
        <option value="nameAsc">Name (A-Z)</option>
        <option value="nameDesc">Name (Z-A)</option>
        <option value="stockAsc">Stock (Low to High)</option>
        <option value="stockDesc">Stock (High to Low)</option>
      </select>

      <button className="filter-btn">
        <FiFilter />
        Filters
      </button>
    </div>
  );
};

export default InventoryFilters;
