import "./WishlistCard.css";
import { FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";

const WishlistCard = ({ product }) => {
  return (
    <div className="wishlist-card">
      <div className="wishlist-image">
        <button className="wishlist-favorite">
          <FiHeart />
        </button>

        <img src={product.image} alt={product.name} />
      </div>

      <div className="wishlist-content">
        <div className="wishlist-rating">
          {Array.from({
            length: product.rating,
          }).map((_, index) => (
            <FiStar key={index} />
          ))}
        </div>

        <h3>{product.name}</h3>

        <div className="wishlist-price">
          <span>{product.price}</span>

          <del>{product.oldPrice}</del>
        </div>

        <div
          className={`wishlist-stock ${
            product.stock === "Out of Stock" ? "out" : ""
          }`}
        >
          {product.stock}
        </div>

        <div className="wishlist-actions">
          <button className="view-btn">
            <FiEye />
            View
          </button>

          <button className="cart-btn">
            <FiShoppingCart />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
