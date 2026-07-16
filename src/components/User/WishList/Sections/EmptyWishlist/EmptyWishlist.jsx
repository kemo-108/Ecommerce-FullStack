import "./EmptyWishlist.css";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <section className="empty-wishlist">
      <div className="empty-icon">
        <FiHeart />
      </div>

      <h2>Your Wishlist is Empty</h2>

      <p>
        You haven't added any products to your wishlist yet. Browse our
        collection and save your favorite items.
      </p>

      <Link to="/shop" className="shop-btn">
        <FiShoppingBag />
        Continue Shopping
      </Link>
    </section>
  );
};

export default EmptyWishlist;
