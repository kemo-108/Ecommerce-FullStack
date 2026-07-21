import "./InventoryRow.css";

import { FiEye, FiEdit2, FiRefreshCw } from "react-icons/fi";

import useInventory from "../../hooks/useInventory";
import { getInventoryStatus } from "../../utils/inventoryStatus";

const InventoryRow = ({ product }) => {
  const { openViewModal, openEditModal, openUpdateStockModal } =
    useInventory();

  const status = getInventoryStatus(product.stock, product.minStock);

  return (
    <tr className="inventory-row">
      <td>
        <div className="product-cell">
          <img src={product.imageUrl} alt={product.name} />

          <div>
            <h4>{product.name}</h4>
            <span>{product.supplier}</span>
          </div>
        </div>
      </td>

      <td>{product.sku}</td>

      <td>{product.category}</td>

      <td>{product.warehouse}</td>

      <td>{product.stock}</td>

      <td>{product.minStock}</td>

      <td>
        <span className={`status ${status.toLowerCase().replace(/\s/g, "-")}`}>
          {status}
        </span>
      </td>

      <td>
        {product.lastUpdated
          ? new Date(product.lastUpdated).toLocaleDateString()
          : ""}
      </td>

      <td>
        <div className="actions">
          <button
            className="view-btn"
            onClick={() => openViewModal(product)}
            title="View"
          >
            <FiEye />
          </button>

          <button
            className="edit-btn"
            onClick={() => openEditModal(product)}
            title="Edit"
          >
            <FiEdit2 />
          </button>

          <button
            className="update-btn"
            onClick={() => openUpdateStockModal(product)}
            title="Update Stock"
          >
            <FiRefreshCw />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryRow;
