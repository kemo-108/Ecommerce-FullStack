import { FiX } from "react-icons/fi";
import "./ViewProductModal.css";
const ViewProductModal = ({ setOpenViewModal, setOpenEditModal, product }) => {
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
              <div className="product-badge">NEW</div>
              <img src={product?.image} alt={product?.name} />{" "}
            </div>

            <div className="view-product-info">
              <div className="info-grid">
                <div className="info-item">
                  <span>Product Name</span>
                  <h4>iPhone 16 Pro Max</h4>
                </div>

                <div className="info-item">
                  <span>Category</span>
                  <h4>Phones</h4>
                </div>

                <div className="info-item">
                  <span>Brand</span>
                  <h4>Apple</h4>
                </div>

                <div className="info-item">
                  <span>Price</span>

                  <div className="price-box">
                    <h4>$1,299</h4>

                    <del>$1,499</del>

                    <small>-10%</small>
                  </div>
                </div>

                <div className="info-item">
                  <span>Discount</span>
                  <h4>10%</h4>
                </div>

                <div className="info-item">
                  <span>Stock</span>
                  <h4>35</h4>
                </div>

                <div className="info-item">
                  <span>SKU</span>
                  <h4>IPH-001</h4>
                </div>

                <div className="info-item">
                  <span>Weight</span>
                  <h4>0.22 Kg</h4>
                </div>
                <div className="info-item">
                  <span>Product Code</span>

                  <h4>PRD-2026-001</h4>
                </div>

                <div className="info-item">
                  <span>Last Updated</span>

                  <h4>28 Jun 2026</h4>
                </div>
              </div>

              <div className="product-description">
                <h3>Description</h3>

                <p>
                  The iPhone 16 Pro Max combines a premium titanium design,
                  Apple's latest A-series processor, a professional triple
                  camera system and an impressive Super Retina XDR display.
                  Built for performance, photography and everyday use with
                  exceptional battery life.
                </p>
              </div>
              <div className="product-extra-card">
                <div className="product-status">
                  <span className="status in-stock">In Stock</span>
                </div>

                <div className="extra-info">
                  <div className="extra-item">
                    <span>Warranty</span>

                    <h5>12 Months</h5>
                  </div>

                  <div className="extra-item">
                    <span>Shipping</span>

                    <h5>Free Shipping</h5>
                  </div>

                  <div className="extra-item">
                    <span>Return</span>

                    <h5>30 Days</h5>
                  </div>
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
