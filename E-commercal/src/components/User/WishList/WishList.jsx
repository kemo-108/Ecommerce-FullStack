import { useEffect, useState } from "react";
import "./WishList.css";
import BannerImage from "../../../image/image-Collection.png";

import WishlistToolbar from "./Sections/WishlistToolbar/WishlistToolbar";
import WishlistGrid from "./Sections/WishlistGrid/WishlistGrid";
import { GetWishlist } from "../../../services/WishlistService";
import { toast } from "react-toastify";

const WishList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("All Products");

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const data = await GetWishlist();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load your wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const filteredProducts = items
    .filter((product) => {
      const term = searchTerm.toLowerCase().trim();
      return !term || (product.productName || "").toLowerCase().includes(term);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Lowest Price":
          return a.price - b.price;
        case "Highest Price":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <section className="wishlist">
      <div className="wishlistImg">
        <img src={BannerImage} alt="wishlist" />
        <h1>My Wishlist</h1>
        <a href="/">Home</a>
      </div>

      <div className="container">
        <WishlistToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading && <p className="wishlist-status">Loading your wishlist...</p>}

        {!loading && (
          <WishlistGrid products={filteredProducts} onChanged={fetchWishlist} />
        )}
      </div>
    </section>
  );
};

export default WishList;
