import "./OrdersList.css";
import OrderRow from "../OrderRow/OrderRow";

const OrdersList = ({ setSelectedOrder }) => {
  const orders = [
    {
      id: "#ORD10254",
      product: "Nike Air Max 270",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      date: "15 Jul 2026",
      total: "$180",
      quantity: 1,
      payment: "Paid",
      status: "Delivered",
    },
    {
      id: "#ORD10255",
      product: "Adidas Ultraboost",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400",
      date: "11 Jul 2026",
      total: "$240",
      quantity: 2,
      payment: "Paid",
      status: "Processing",
    },
    {
      id: "#ORD10256",
      product: "Puma RS-X",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      date: "9 Jul 2026",
      total: "$160",
      quantity: 1,
      payment: "Pending",
      status: "Shipped",
    },
  ];

  return (
    <div className="orders-table">
      <div className="table-head">
        <span>Product</span>

        <span>Order ID</span>

        <span>Date</span>

        <span>Total</span>

        <span>Status</span>

        <span>Action</span>
      </div>

      <div className="table-body">
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            setSelectedOrder={setSelectedOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
