import React from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import "./Header.css";
const links = [
  { id: 1, title: "Home", Url: "/" },
  { id: 2, title: "Shop", Url: "/shop" },
  { id: 3, title: "About", Url: "/about" },
  { id: 4, title: "Service", Url: "/Service" },
  { id: 5, title: "Contact", Url: "/contact" },
];
const Navber = () => {
  const navigate = useNavigate();
  const goToLastProduct = async () => {
    const lastViewed = localStorage.getItem("lastViewedProduct");

    if (lastViewed) {
      navigate(`/single-product/${lastViewed}`);
    } else {
      navigate("/shop");
    }
  };
  return (
    <div className="navbar">
      <div className="nav-links">
        {links.map((link) => (
          <div key={link.id} className="nav-item">
            <Link to={link.Url} className="nav-link">
              {link.title}
            </Link>

            {link.title === "Shop" && (
              <MdOutlineKeyboardDoubleArrowDown className="shop-icon" />
            )}
            {link.title === "Shop" && (
              <div className="dropdown-menu">
                <Link to="/shop" className="dropdown-item">
                  Shop
                </Link>
                <Link
                  to=""
                  onClick={(e) => {
                    goToLastProduct();
                    e.preventDefault();
                  }}
                  className="dropdown-item"
                >
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
      <Link to="/login">
        <CgProfile className="login-icon" />
      </Link>
    </div>
  );
};

export default Navber;
