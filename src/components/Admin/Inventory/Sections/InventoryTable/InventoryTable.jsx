import "./InventoryTable.css";

import InventoryRow from "./InventoryRow";

import useInventory from "../../hooks/useInventory";

const InventoryTable = () => {
  const { paginatedProducts } = useInventory();

  return (
    <div className="inventory-table-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Warehouse</th>
            <th>Stock</th>
            <th>Min Stock</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <InventoryRow key={product.productId} product={product} />
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-products">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
