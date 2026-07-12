import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Product.css";
import { useEffect, useState } from "react";
import { AddToCart } from "../../services/CartService";
import { toast } from "react-toastify";

const Product = ({ product, showExtraBtn }) => {
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorite(favorites.includes(product.productId));
  }, [product.productId]);

  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(product.productId)) {
      favorites = favorites.filter((id) => id !== product.productId);
      setFavorite(false);
    } else {
      favorites.push(product.productId);
      setFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
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
      console.error("Error adding to cart:", error);
      toast.error("Could not add product to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/single-product/${product.productId}`}>
        <img
          src={`https://localhost:7069/${product.imageUrl}`}
          alt={product.productName}
        />
      </Link>

      <h3>
        <Link to={`/single-product/${product.productId}`}>
          {product.productName}
        </Link>
      </h3>

      <div className="product-info">
        <span className="price">{product.price} L.E</span>

        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => setRating(star)}>
              {star <= rating ? <IoMdStar /> : <IoMdStarOutline />}
            </span>
          ))}
        </div>
      </div>

      {showExtraBtn && (
        <>
          <div className="product-divider"></div>

          <div className="product-actions">
            <button
              className="cart-btn"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? "ADDING..." : "ADD TO CART +"}
            </button>

            <button className="heart-btn" onClick={handleFavorite}>
              {favorite ? <FaHeart className="favorite" /> : <FaRegHeart />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
