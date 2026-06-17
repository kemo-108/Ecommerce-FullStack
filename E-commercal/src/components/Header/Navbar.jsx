import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Header.css";
const links = [
  { id: 1, title: "Home", Url: "/" },
  { id: 2, title: "Shop", Url: "/shop" },
  { id: 3, title: "About", Url: "/about" },
  { id: 4, title: "Blog", Url: "/blog" },
  { id: 5, title: "Contact", Url: "/contact" },
];
const Navber = () => {
  return (
    <div className="navbar">
      <div className="nav-links">
        {links.map((link) => (
          <div key={link.id} className="nav-item">
            <Link to={link.Url} className="nav-link">
              {link.title}
            </Link>

            {link.title === "Shop" && <IoIosArrowDown className="shop-icon" />}
            {link.title === "Shop" && (
              <div className="dropdown-menu">
                <Link to="/shop" className="dropdown-item">
                  Shop
                </Link>
                <Link to="/single-product" className="dropdown-item">
                  Single Product
                </Link>
                <Link to="/cart" className="dropdown-item">
                  Cart
                </Link>
                <Link to="/checkout" className="dropdown-item">
                  Checkout
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navber;
