import "./RefundTable.css";
import RefundRow from "../RefundRow/RefundRow";

const RefundTable = () => {
  const refunds = [
    {
      id: 1,
      customer: "Ahmed Mohamed",
      avatar: "https://i.pravatar.cc/100?img=11",
      orderId: "#ORD-10245",
      products: 2,
      reason: "Wrong Size",
      amount: "$180",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Khaled Ali",
      avatar: "https://i.pravatar.cc/100?img=12",
      orderId: "#ORD-10246",
      products: 1,
      reason: "Damaged Item",
      amount: "$95",
      status: "Approved",
    },
    {
      id: 3,
      customer: "Sara Ahmed",
      avatar: "https://i.pravatar.cc/100?img=32",
      orderId: "#ORD-10247",
      products: 3,
      reason: "Changed Mind",
      amount: "$240",
      status: "Rejected",
    },
    {
      id: 4,
      customer: "Mohamed Hassan",
      avatar: "https://i.pravatar.cc/100?img=15",
      orderId: "#ORD-10248",
      products: 1,
      reason: "Wrong Product",
      amount: "$130",
      status: "Pending",
    },
  ];

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
        {refunds.map((refund) => (
          <RefundRow key={refund.id} refund={refund} />
        ))}
      </div>
    </div>
  );
};

export default RefundTable;
