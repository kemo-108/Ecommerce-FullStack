import "./WishlistGrid.css";

import WishlistCard from "../WishlistCard/WishlistCard";
import EmptyWishlist from "../EmptyWishlist/EmptyWishlist";

const WishlistGrid = ({ products, onChanged }) => {
  if (products.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="wishlist-grid">
      {products.map((product) => (
        <WishlistCard
          key={product.id}
          product={product}
          onChanged={onChanged}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;
