import "./ReturnsTable.css";
import ReturnRow from "../ReturnRow/ReturnRow";

const ReturnsTable = ({ items }) => {
  return (
    <div className="returns-table">
      <div className="returns-table-head">
        <span>Product</span>
        <span>Return ID</span>
        <span>Order ID</span>
        <span>Date</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      <div className="returns-table-body">
        {items.length > 0 ? (
          items.map((item) => <ReturnRow key={item.id} item={item} />)
        ) : (
          <p className="returns-empty">No returns found.</p>
        )}
      </div>
    </div>
  );
};

export default ReturnsTable;
