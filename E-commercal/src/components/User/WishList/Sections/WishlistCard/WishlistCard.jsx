import { useState } from "react";
import "./WishlistCard.css";
import { FiHeart, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RemoveFromWishlist } from "../../../../../services/WishlistService";
import { AddToCart } from "../../../../../services/CartService";

const WishlistCard = ({ product, onChanged }) => {
  const navigate = useNavigate();
  const [removing, setRemoving] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleRemove = async () => {
    if (removing) return;
    setRemoving(true);
    try {
      await RemoveFromWishlist(product.id);
      toast.success("Removed from wishlist");
      onChanged?.();
    } catch (error) {
      console.error(error);
      toast.error("Could not remove item");
    } finally {
      setRemoving(false);
    }
  };

  const handleView = () => {
    navigate(`/single-product/${product.productId}`);
  };

  const handleAddToCart = async () => {
    if (addingToCart) return;
    setAddingToCart(true);
    try {
      await AddToCart({
        productId: product.productId,
        productName: product.productName,
        imageUrl: product.imageUrl,
        price: product.price,
        Qty: 1,
      });
      toast.success(`${product.productName} added to cart`);
    } catch (error) {
      console.error(error);
      toast.error("Could not add product to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const isOutOfStock = product.stock === 0 || product.stock === "Out of Stock";

  return (
    <div className="wishlist-card">
      <div className="wishlist-image">
        <button
          className="wishlist-favorite"
          onClick={handleRemove}
          disabled={removing}
          title="Remove from wishlist"
        >
          <FiHeart />
        </button>

        <img
          src={`https://localhost:7069/${product.imageUrl}`}
          alt={product.productName}
        />
      </div>

      <div className="wishlist-content">
        {product.rating > 0 && (
          <div className="wishlist-rating">
            {Array.from({ length: Math.round(product.rating) }).map(
              (_, index) => (
                <FiStar key={index} />
              )
            )}
          </div>
        )}

        <h3>{product.productName}</h3>

        <div className="wishlist-price">
          <span>${Number(product.price || 0).toFixed(2)}</span>

          {product.oldPrice > product.price && (
            <del>${Number(product.oldPrice).toFixed(2)}</del>
          )}
        </div>

        <div className={`wishlist-stock ${isOutOfStock ? "out" : ""}`}>
          {isOutOfStock ? "Out of Stock" : "In Stock"}
        </div>

        <div className="wishlist-actions">
          <button className="view-btn" onClick={handleView}>
            <FiEye />
            View
          </button>

          <button
            className="cart-btn"
            onClick={handleAddToCart}
            disabled={isOutOfStock || addingToCart}
          >
            <FiShoppingCart />
            {addingToCart ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
