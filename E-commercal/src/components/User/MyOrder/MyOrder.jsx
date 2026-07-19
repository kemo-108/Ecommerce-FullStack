import { useEffect, useState } from "react";
import "./MyOrder.css";
import { toast } from "react-toastify";

import OrdersToolbar from "./Sections/OrdersToolbar/OrdersToolbar";
import OrdersList from "./Sections/OrdersList/OrdersList";
import OrderDetailsModal from "./Sections/OrderDetailsModal/OrderDetailsModal";
import { GetMyOrders } from "../../../services/OrderService";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Orders");
  const [sortBy, setSortBy] = useState("Latest");

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await GetMyOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = orders
    .filter((order) => {
      const term = searchTerm.toLowerCase().trim();
      const firstItemName = order.items?.[0]?.productName || "";
      const matchesSearch =
        !term ||
        String(order.orderId).toLowerCase().includes(term) ||
        firstItemName.toLowerCase().includes(term);

      const matchesStatus =
        selectedStatus === "All Orders" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Oldest":
          return new Date(a.orderDate) - new Date(b.orderDate);
        case "Highest Price":
          return b.total - a.total;
        case "Lowest Price":
          return a.total - b.total;
        default:
          return new Date(b.orderDate) - new Date(a.orderDate);
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

      {loading && <p>Loading your orders...</p>}

      {!loading && (
        <OrdersList orders={filteredOrders} setSelectedOrder={setSelectedOrder} />
      )}

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
