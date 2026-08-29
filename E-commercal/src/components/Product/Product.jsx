import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Product.css";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../utils/imageUrl";
import { AddToCart } from "../../services/CartService";
import {
  AddToWishlist,
  RemoveFromWishlist,
} from "../../services/WishlistService";
import { IsAuthenticated } from "../../services/AuthService";
import { toast } from "react-toastify";

const Product = ({ product, showExtraBtn, wishlist = [] }) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const [togglingWishlist, setTogglingWishlist] = useState(false);

  // Derived from the wishlist the parent page already fetched once,
  // instead of every card fetching its own copy of the whole list.
  const match = wishlist.find((item) => item.productId === product.productId);
  const [favorite, setFavorite] = useState(!!match);
  const [wishlistId, setWishlistId] = useState(match?.id ?? null);

  useEffect(() => {
    setFavorite(!!match);
    setWishlistId(match?.id ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.id, product.productId]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (togglingWishlist) return;

    if (!IsAuthenticated()) {
      toast.info("Please log in to save items to your wishlist");
      return;
    }

    setTogglingWishlist(true);
    try {
      if (favorite) {
        await RemoveFromWishlist(wishlistId);
        setFavorite(false);
        setWishlistId(null);
      } else {
        const created = await AddToWishlist(product.productId);
        setFavorite(true);
        setWishlistId(created?.id);
      }
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (error) {
      console.error(error);
      toast.error("Could not update wishlist");
    } finally {
      setTogglingWishlist(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
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
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401) {
        toast.error("Please create an account to add items to your cart");
      } else {
        toast.error("Could not add product to cart");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const savings = hasDiscount ? product.oldPrice - product.price : 0;

  return (
    <Link to={`/single-product/${product.productId}`} className="product-card">
      <div className="pcard-image">
        {hasDiscount && (
          <span className="save-badge">Save {savings.toFixed(0)} EGP</span>
        )}

        <button
          type="button"
          className="icon-btn favorite-btn"
          onClick={handleFavorite}
          disabled={togglingWishlist}
          aria-label="Add to wishlist"
        >
          {favorite ? <FaHeart className="favorite" /> : <FaRegHeart />}
        </button>

        {showExtraBtn && (
          <button
            type="button"
            className="icon-btn add-btn"
            onClick={handleAddToCart}
            disabled={addingToCart}
            aria-label="Add to cart"
          >
            <FiPlus />
          </button>
        )}
        <img
          src={getImageUrl(product.imageUrl)}
          alt={product.productName}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="pcard-info">
        <h3>{product.productName}</h3>

        {product.category && <span className="brand">{product.category}</span>}
        <div className="price-row">
          <span className="price">
            EGP {Number(product.price || 0).toFixed(0)}
          </span>

          {hasDiscount && (
            <del className="old-price">
              EGP {Number(product.oldPrice).toFixed(0)}
            </del>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;
