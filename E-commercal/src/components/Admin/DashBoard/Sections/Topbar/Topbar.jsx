import "./Topbar.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../../../../../services/AuthService";

const Topbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const admin = GetCurrentUser();

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
        <div className="admin-info">
          <img
            src={admin?.avatar || "https://i.pravatar.cc/150"}
            alt={admin?.name || "Admin"}
          />

          <div>
            <h4>{admin?.name || "Admin"}</h4>

            <p>Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
