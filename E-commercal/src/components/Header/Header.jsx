import React, { useEffect, useState } from "react";
import logo from "../../image/image.png";
import Navber from "./Navbar";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiPhone,
  FiTruck,
} from "react-icons/fi";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { GetCart } from "../../services/CartService";
import { GetWishlist } from "../../services/WishlistService";
import { IsAuthenticated } from "../../services/AuthService";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/shop?search=${encodeURIComponent(query)}` : "/shop");
  };

  const refreshCartCount = () => {
    if (!IsAuthenticated()) return setCartCount(0);
    GetCart()
      .then((data) =>
        setCartCount(
          Array.isArray(data)
            ? data.reduce((sum, item) => sum + (item.Qty || 1), 0)
            : 0,
        ),
      )
      .catch(() => setCartCount(0));
  };

  const refreshWishlistCount = () => {
    if (!IsAuthenticated()) return setWishlistCount(0);
    GetWishlist()
      .then((data) => setWishlistCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setWishlistCount(0));
  };

  useEffect(() => {
    refreshCartCount();
    refreshWishlistCount();

    window.addEventListener("cart-updated", refreshCartCount);
    window.addEventListener("wishlist-updated", refreshWishlistCount);

    return () => {
      window.removeEventListener("cart-updated", refreshCartCount);
      window.removeEventListener("wishlist-updated", refreshWishlistCount);
    };
  }, []);

  return (
    <div className="header">
      {/* ================= Top utility bar ================= */}
      <div className="header-topbar">
        <div className="container topbar-inner">
          <span className="topbar-item">
            <FiTruck /> Free shipping on orders over $100
          </span>

          <a href="tel:+11234567890" className="topbar-item">
            <FiPhone /> (123) 456-7890
          </a>
        </div>
      </div>

      {/* ================= Main header ================= */}
      <div className="header-main">
        <div className="container header-main-inner">
          <Link to="/" className="logo">
            <img src={logo} alt="Art Corner logo" />
            <span>Art Corner</span>
          </Link>

          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for products..."
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FiSearch size={20} />
            </button>
          </form>

          <div className="header-icons">
            <Link to="/wishlist" className="icon-link">
              <FiHeart size={22} />
              {wishlistCount > 0 && (
                <span className="count">{wishlistCount}</span>
              )}
              <span className="icon-label">Wishlist</span>
            </Link>

            <Link to="/cart" className="icon-link">
              <FiShoppingCart size={22} />
              {cartCount > 0 && <span className="count">{cartCount}</span>}
              <span className="icon-label">Cart</span>
            </Link>

            <Link
              to={IsAuthenticated() ? "/account/profile" : "/login"}
              className="icon-link"
            >
              <FiUser size={22} />
              <span className="icon-label">Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= Category / nav bar ================= */}
      <Navber />
    </div>
  );
};

export default Header;
