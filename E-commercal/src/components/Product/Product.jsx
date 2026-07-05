import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Product.css";
import { useEffect, useState } from "react";

const Product = ({ product, showExtraBtn }) => {
  const [rating, setRating] = useState(0);
  const [favorite, setFavorite] = useState(false);

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

  return (
    <div className="product-card">
      <Link to={`/single-product/${product.productId}`}>
        <img
          src={`https://localhost:7005/${product.imageUrl}`}
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
            <button className="cart-btn">ADD TO CART +</button>

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
