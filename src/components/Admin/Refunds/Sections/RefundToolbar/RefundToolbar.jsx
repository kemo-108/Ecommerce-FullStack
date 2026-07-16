import "./RefundToolbar.css";
import { FiDownload } from "react-icons/fi";

const RefundToolbar = () => {
  return (
    <div className="refund-toolbar">
      <div className="refund-toolbar-content">
        <h2>Refund Requests</h2>

        <p>
          Manage customer refund requests and keep track of their current
          status.
        </p>
      </div>

      <button className="export-btn">
        <FiDownload />
        Export
      </button>
    </div>
  );
};

export default RefundToolbar;
