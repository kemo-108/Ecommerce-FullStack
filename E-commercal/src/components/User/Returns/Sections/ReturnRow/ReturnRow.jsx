import "./ReturnRow.css";
import { FiEye, FiRotateCcw } from "react-icons/fi";

const ReturnRow = ({ item }) => {
  return (
    <div className="return-row">
      <div className="return-product">
        <img src={item.image} alt={item.name} />

        <div>
          <h4>{item.name}</h4>
          <p>Qty : {item.qty}</p>
          <span>Total : {item.total}</span>
        </div>
      </div>

      <span className="id-badge">#{item.returnId}</span>

      <span className="id-badge">#{item.orderId}</span>

      <span>{item.date}</span>

      <span className={`status ${item.status.toLowerCase()}`}>
        {item.status}
      </span>

      <div className="return-actions">
        <button className="view-btn">
          <FiEye />
        </button>

        {item.status === "Processing" && (
          <button className="cancel-btn">
            <FiRotateCcw />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReturnRow;
