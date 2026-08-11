import "./WishlistProductModal.css";
import { FiX, FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";

const WishlistProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="wishlist-modal-overlay" onClick={onClose}>
      <div className="wishlist-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          <FiX />
        </button>

        <div className="wishlist-modal-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="wishlist-modal-content">
          <div className="wishlist-modal-rating">
            {Array.from({
              length: product.rating,
            }).map((_, index) => (
              <FiStar key={index} />
            ))}
          </div>

          <h2>{product.name}</h2>

          <p className="wishlist-modal-price">
            {product.price}

            <del>{product.oldPrice}</del>
          </p>

          <p className="wishlist-description">
            Premium quality product with modern design and comfortable
            materials. Perfect for everyday use.
          </p>

          <div
            className={`wishlist-modal-stock ${
              product.stock === "Out of Stock" ? "out" : ""
            }`}
          >
            {product.stock}
          </div>

          <div className="wishlist-modal-buttons">
            <button className="cart-btn">
              <FiShoppingCart />
              Add To Cart
            </button>

            <button className="remove-btn">
              <FiHeart />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistProductModal;
