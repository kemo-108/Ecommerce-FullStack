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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/shop");
    }
  };

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

          <form className="search-box" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search..."
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
