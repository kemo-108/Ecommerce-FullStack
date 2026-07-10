import { useState } from "react";
import "./WishList.css";

import WishlistToolbar from "./Sections/WishlistToolbar/WishlistToolbar";
import WishlistGrid from "./Sections/WishlistGrid/WishlistGrid";

const WISHLIST_DATA = [
  {
    id: 1,
    name: "Nike Air Max 270",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    price: 220,
    oldPrice: 260,
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
    price: 180,
    oldPrice: 210,
    rating: 4,
    stock: "Only 3 Left",
  },
  {
    id: 3,
    name: "Puma RS-X",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    price: 160,
    oldPrice: 190,
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 4,
    name: "New Balance 550",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
    price: 200,
    oldPrice: 240,
    rating: 4,
    stock: "Out of Stock",
  },
];

const WishList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("All Products");

  const filteredProducts = WISHLIST_DATA.filter((product) => {
    const term = searchTerm.toLowerCase().trim();
    return !term || product.name.toLowerCase().includes(term);
  }).sort((a, b) => {
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
      <WishlistToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <WishlistGrid products={filteredProducts} />
    </section>
  );
};

export default WishList;
