import "./Topbar.css";
import { FaSearch, FaBell, FaEnvelope } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="search-box">
          <FaSearch />

          <input type="text" placeholder="Search..." />
        </div>
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
