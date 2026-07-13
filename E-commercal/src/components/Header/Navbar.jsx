import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX, FiHeart } from "react-icons/fi";
import "./Header.css";
const links = [
  { id: 1, title: "Home", Url: "/" },
  { id: 2, title: "Shop", Url: "/shop" },
  { id: 3, title: "Category", Url: "/category" },
  { id: 4, title: "Contact", Url: "/contact" },
];
const Navber = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="navbar">
      <button
        type="button"
        className="navbar-toggle"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
      </button>

      <div className={mobileOpen ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <div key={link.id} className="nav-item">
            <Link to={link.Url} className="nav-link" onClick={closeMobileMenu}>
              {link.title}
            </Link>
          </div>
        ))}

        <Link to="/login" className="login-icon-mobile" onClick={closeMobileMenu}>
          <CgProfile className="login-icon" />
        </Link>
        <Link to="/wishlist" className="wishlist-icon-mobile" onClick={closeMobileMenu}>
          <FiHeart className="login-icon" />
        </Link>
      </div>

      <Link to="/wishlist" className="wishlist-icon-desktop">
        <FiHeart className="login-icon" />
      </Link>

      <Link to="/login" className="login-icon-desktop">
        <CgProfile className="login-icon" />
      </Link>
    </div>
  );
};

export default Navber;
