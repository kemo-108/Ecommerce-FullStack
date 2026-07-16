import "./WishlistToolbar.css";
import { FiSearch } from "react-icons/fi";

const WishlistToolbar = ({ searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  return (
    <section className="wishlist-toolbar">
      <div className="wishlist-title">
        <h2>My Wishlist</h2>

        <p>Save your favorite products and buy them later.</p>
      </div>

      <div className="wishlist-actions">
        <div className="wishlist-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>All Products</option>

          <option>Newest</option>

          <option>Lowest Price</option>

          <option>Highest Price</option>
        </select>
      </div>
    </section>
  );
};

export default WishlistToolbar;
