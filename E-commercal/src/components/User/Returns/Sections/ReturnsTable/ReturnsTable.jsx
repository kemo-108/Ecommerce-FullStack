import "./ReturnsTable.css";
import ReturnRow from "../ReturnRow/ReturnRow";

const ReturnsTable = () => {
  const returns = [
    {
      id: 1,
      returnId: "RT10254",
      orderId: "ORD10254",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      name: "Nike Air Max 270",
      qty: 1,
      total: "$180",
      date: "15 Jul 2026",
      status: "Delivered",
    },
    {
      id: 2,
      returnId: "RT10255",
      orderId: "ORD10255",
      image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=300",
      name: "Adidas Ultraboost",
      qty: 2,
      total: "$240",
      date: "11 Jul 2026",
      status: "Processing",
    },
    {
      id: 3,
      returnId: "RT10256",
      orderId: "ORD10256",
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300",
      name: "Sony WH-1000XM5",
      qty: 1,
      total: "$150",
      date: "08 Jul 2026",
      status: "Rejected",
    },
  ];

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
        {returns.map((item) => (
          <ReturnRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ReturnsTable;
