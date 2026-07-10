import "./Topbar.css";
import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (term) {
      navigate(`/admin/products?search=${encodeURIComponent(term)}`);
    }
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <form className="search-box" onSubmit={handleSearch}>
          <FaSearch onClick={handleSearch} style={{ cursor: "pointer" }} />

          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="topbar-right">
        <div className="topbar-icon">
          <FaBell />

          <span>3</span>
        </div>

        <div className="topbar-icon">
          <FaEnvelope />

          <span>5</span>
        </div>

        <div className="admin-info">
          <img src="https://i.pravatar.cc/150?img=12" alt="Admin" />

          <div>
            <h4>Kemo Mostafa</h4>

            <p>Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
