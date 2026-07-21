import "./ReturnsHeader.css";
import { FiPlus } from "react-icons/fi";

const ReturnsHeader = ({ onRequestReturn }) => {
  return (
    <div className="returns-header">
      <div className="returns-header-text">
        <h2>My Returns</h2>
        <p>Track your return requests and refund status from one place.</p>
      </div>

      <button className="request-return-btn" onClick={onRequestReturn}>
        <FiPlus />
        Request a Return
      </button>
    </div>
  );
};

export default ReturnsHeader;
