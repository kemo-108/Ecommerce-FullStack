import "./RefundTable.css";
import RefundRow from "../RefundRow/RefundRow";

const RefundTable = ({ refunds }) => {
  return (
    <div className="refund-table">
      <div className="refund-table-head">
        <span>Customer</span>
        <span>Order</span>
        <span>Products</span>
        <span>Reason</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      <div className="refund-table-body">
        {refunds.length > 0 ? (
          refunds.map((refund) => <RefundRow key={refund.id} refund={refund} />)
        ) : (
          <p className="refund-empty">No refunds found.</p>
        )}
      </div>
    </div>
  );
};

export default RefundTable;
