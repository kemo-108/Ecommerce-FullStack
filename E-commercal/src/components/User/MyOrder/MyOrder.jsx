import { useState } from "react";
import "./MyOrder.css";

import OrdersToolbar from "./Sections/OrdersToolbar/OrdersToolbar";
import OrdersList from "./Sections/OrdersList/OrdersList";
import OrderDetailsModal from "./Sections/OrderDetailsModal/OrderDetailsModal";

const ORDERS_DATA = [
  {
    id: "#ORD10254",
    product: "Nike Air Max 270",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    date: "15 Jul 2026",
    total: 180,
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
    total: 240,
    quantity: 2,
    payment: "Paid",
    status: "Processing",
  },
  {
    id: "#ORD10256",
    product: "Puma RS-X",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    date: "9 Jul 2026",
    total: 160,
    quantity: 1,
    payment: "Pending",
    status: "Shipped",
  },
];

const MyOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Orders");
  const [sortBy, setSortBy] = useState("Latest");

  const filteredOrders = ORDERS_DATA.filter((order) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      order.id.toLowerCase().includes(term) ||
      order.product.toLowerCase().includes(term);

    const matchesStatus =
      selectedStatus === "All Orders" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    switch (sortBy) {
      case "Oldest":
        return new Date(a.date) - new Date(b.date);
      case "Highest Price":
        return b.total - a.total;
      case "Lowest Price":
        return a.total - b.total;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return (
    <div className="my-orders">
      <OrdersToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <OrdersList orders={filteredOrders} setSelectedOrder={setSelectedOrder} />

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default MyOrder;
