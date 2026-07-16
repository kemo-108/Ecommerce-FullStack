import "./ViewInventoryModal.css";

import {
  FiX,
  FiPackage,
  FiTag,
  FiHome,
  FiTruck,
  FiHash,
  FiCalendar,
} from "react-icons/fi";

import { getInventoryStatus } from "../../../utils/inventoryStatus";

const ViewInventoryModal = ({ product, onClose }) => {
  if (!product) return null;

  const status = getInventoryStatus(product.stock, product.minStock);

  return (
    <div className="modal-overlay">
      <div className="view-inventory-modal">
        {/* Header */}

        <div className="modal-header">
          <h2>Product Details</h2>

          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* Body */}

        <div className="modal-body">
          <div className="product-preview">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className="product-details">
            <h3>{product.name}</h3>

            <span
              className={`status ${status.toLowerCase().replace(/\s/g, "-")}`}
            >
              {status}
            </span>

            <div className="details-grid">
              <div className="detail-item">
                <FiHash />

                <div>
                  <label>SKU</label>

                  <p>{product.sku}</p>
                </div>
              </div>

              <div className="detail-item">
                <FiPackage />

                <div>
                  <label>Category</label>

                  <p>{product.category}</p>
                </div>
              </div>

              <div className="detail-item">
                <FiHome />

                <div>
                  <label>Warehouse</label>

                  <p>{product.warehouse}</p>
                </div>
              </div>

              <div className="detail-item">
                <FiTruck />

                <div>
                  <label>Supplier</label>

                  <p>{product.supplier}</p>
                </div>
              </div>

              <div className="detail-item">
                <FiTag />

                <div>
                  <label>Price</label>

                  <p>${product.price}</p>
                </div>
              </div>

              <div className="detail-item">
                <FiCalendar />

                <div>
                  <label>Last Updated</label>

                  <p>{product.lastUpdated}</p>
                </div>
              </div>
            </div>

            <div className="stock-summary">
              <div>
                <h4>Current Stock</h4>

                <span>{product.stock}</span>
              </div>

              <div>
                <h4>Minimum Stock</h4>

                <span>{product.minStock}</span>
              </div>
            </div>

            <div className="description">
              <h4>Description</h4>

              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInventoryModal;
