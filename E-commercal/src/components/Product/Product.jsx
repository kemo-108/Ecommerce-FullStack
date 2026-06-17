import { FaRegHeart } from "react-icons/fa";
import { IoMdStarOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Product.css";
const Product = ({ product, showExtraBtn }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.productId}`}>
        <img
          src={`https://localhost:7005/${product.imageUrl}`}
          width={100}
          height={100}
          alt={product.productName}
        />
      </Link>
      <h3>
        <Link to={`/product/${product.productId}`}>{product.productName}</Link>
      </h3>
      <div className="product-info">
        <span className="price">Price: ${product.price}</span>
        {showExtraBtn && (
          <div className={`product-info ${showExtraBtn ? "full-card" : ""}`}>
            <button>ADD TO CART +</button>
            <span>
              <FaRegHeart />
            </span>
          </div>
        )}
        <div className="rating">
          <span>
            <IoMdStarOutline />
          </span>
          <span>
            <IoMdStarOutline />
          </span>
          <span>
            <IoMdStarOutline />
          </span>
          <span>
            <IoMdStarOutline />
          </span>
          <span>
            <IoMdStarOutline />
          </span>
        </div>
      </div>
    </div>
  );
};
export default Product;
