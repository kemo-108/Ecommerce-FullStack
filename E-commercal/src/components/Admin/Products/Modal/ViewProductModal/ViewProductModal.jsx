import { FiX } from "react-icons/fi";
import "./ViewProductModal.css";

const ViewProductModal = ({ setOpenViewModal, setOpenEditModal, product }) => {
  if (!product) return null;

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : 0;

  const stockLabel =
    product.qty === 0
      ? "Out Of Stock"
      : product.qty <= 10
      ? "Low Stock"
      : "In Stock";

  const stockClass =
    product.qty === 0
      ? "out-of-stock"
      : product.qty <= 10
      ? "low-stock"
      : "in-stock";

  return (
    <div className="modal-overlay">
      <div className="view-product-modal">
        <div className="modal-header">
          <h2>Product Details</h2>

          <button
            className="close-modal"
            onClick={() => setOpenViewModal(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="modal-content">
          <div className="view-product-content">
            <div className="view-product-image">
              <img
                src={`https://localhost:7069/${product.imageUrl}`}
                alt={product.productName}
              />
            </div>

            <div className="view-product-info">
              <div className="info-grid">
                <div className="info-item">
                  <span>Product Name</span>
                  <h4>{product.productName}</h4>
                </div>

                <div className="info-item">
                  <span>Category</span>
                  <h4>{product.category || "N/A"}</h4>
                </div>

                <div className="info-item">
                  <span>Brand</span>
                  <h4>{product.brand || "N/A"}</h4>
                </div>

                <div className="info-item">
                  <span>Price</span>

                  <div className="price-box">
                    <h4>${Number(product.price || 0).toFixed(2)}</h4>

                    {hasDiscount && (
                      <>
                        <del>${Number(product.oldPrice).toFixed(2)}</del>
                        <small>-{discountPercent}%</small>
                      </>
                    )}
                  </div>
                </div>

                <div className="info-item">
                  <span>Stock</span>
                  <h4>{product.qty ?? 0}</h4>
                </div>

                <div className="info-item">
                  <span>SKU / Code</span>
                  <h4>{product.code || "N/A"}</h4>
                </div>

                <div className="info-item">
                  <span>Weight</span>
                  <h4>{product.weight ? `${product.weight} Kg` : "N/A"}</h4>
                </div>

                <div className="info-item">
                  <span>Last Updated</span>
                  <h4>{product.updatedAt || product.createdAt || "N/A"}</h4>
                </div>
              </div>

              <div className="product-description">
                <h3>Description</h3>

                <p>{product.description || "No description available."}</p>
              </div>
              <div className="product-extra-card">
                <div className="product-status">
                  <span className={`status ${stockClass}`}>{stockLabel}</span>
                </div>
              </div>

              <div className="view-modal-footer">
                <button
                  className="cancel-btn"
                  onClick={() => setOpenViewModal(false)}
                >
                  Close
                </button>

                <button
                  className="save-btn"
                  onClick={() => {
                    setOpenViewModal(false);
                    setOpenEditModal(true);
                  }}
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
