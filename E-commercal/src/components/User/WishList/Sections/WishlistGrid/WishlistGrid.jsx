import "./WishlistGrid.css";

import WishlistCard from "../WishlistCard/WishlistCard";
import EmptyWishlist from "../EmptyWishlist/EmptyWishlist";

const WishlistGrid = () => {
  const products = [
    {
      id: 1,
      name: "Nike Air Max 270",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      price: "$220",
      oldPrice: "$260",
      rating: 5,
      stock: "In Stock",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
      price: "$180",
      oldPrice: "$210",
      rating: 4,
      stock: "Only 3 Left",
    },
    {
      id: 3,
      name: "Puma RS-X",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      price: "$160",
      oldPrice: "$190",
      rating: 5,
      stock: "In Stock",
    },
    {
      id: 4,
      name: "New Balance 550",
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
      price: "$200",
      oldPrice: "$240",
      rating: 4,
      stock: "Out of Stock",
    },
  ];

  if (products.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="wishlist-grid">
      {products.map((product) => (
        <WishlistCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default WishlistGrid;
