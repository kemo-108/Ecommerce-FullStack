import React, { useEffect, useState } from "react";
import logo from "../../image/image.png";
import Sidebar from "./Sidebar";
import Navber from "./Navbar";
import { MdSavedSearch } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={scrolled ? "header active" : "header"}>
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" width={90} />
          </Link>
          <h4>Art Corner</h4>

          <form action="" className="search-box">
            <input
              type="text"
              placeholder="Search..."
              name="search"
              id="search"
            />
            <button type="submit">
              <MdSavedSearch size={30} />
            </button>
          </form>

          <div className="Header_icons">
            <div className="icon">
              <FaCartShopping size={30} onClick={() => navigate("/cart")} />
              <span className="count">
                {"["}0{"]"}
              </span>
            </div>
          </div>
        </div>
        <Navber />
      </div>
    </>
  );
};

export default Header;
