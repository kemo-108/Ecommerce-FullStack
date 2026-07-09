import "./RefundRow.css";

import { FiEye, FiCheck, FiX } from "react-icons/fi";

const RefundRow = ({ refund }) => {
  return (
    <div className="refund-row">
      <div className="refund-customer">
        <img src={refund.avatar} alt={refund.customer} />

        <div>
          <h4>{refund.customer}</h4>

          <span>Customer</span>
        </div>
      </div>

      <span>{refund.orderId}</span>

      <span>{refund.products} Items</span>

      <span>{refund.reason}</span>

      <strong>{refund.amount}</strong>

      <span className={`refund-status ${refund.status.toLowerCase()}`}>
        {refund.status}
      </span>

      <div className="refund-actions">
        <button className="view-btn">
          <FiEye />
        </button>

        <button className="approve-btn">
          <FiCheck />
        </button>

        <button className="reject-btn">
          <FiX />
        </button>
      </div>
    </div>
  );
};

export default RefundRow;
