import { useEffect, useState } from "react";

import "./Orders.css";
import { toast } from "react-toastify";

import { GetAllOrders } from "../../../services/OrderService";
import OrdersHeader from "./OrdersHeader";
import OrdersFilters from "./OrdersFilters";
import OrdersStats from "./OrdersStats";
import OrdersTable from "./OrdersTable";
import OrdersPagination from "./OrdersPagination";
import AddOrderModal from "./Modal/AddOrderModal/AddOrderModal";
import ViewOrderModal from "./Modal/ViewOrderModal/ViewOrderModal";
import UpdateOrderStatusModal from "./Modal/UpdateOrderStatusModal/UpdateOrderStatusModal";
import DeleteOrderModal from "./Modal/DeleteOrderModal/DeleteOrderModal";
import PrintInvoiceModal from "./Modal/PrintInvoiceModal/PrintInvoiceModal";
const Orders = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedPayment, setSelectedPayment] = useState("All Payment");
  const [sortBy, setSortBy] = useState("Newest");

  const [currentPage, setCurrentPage] = useState(1);

  const ORDERS_PER_PAGE = 8;

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const data = await GetAllOrders();
      setOrders(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load orders."
      );
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders
    .filter((order) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        order.customerName.toLowerCase().includes(term) ||
        order.customerEmail.toLowerCase().includes(term) ||
        String(order.orderId).includes(term);

      const matchesStatus =
        selectedStatus === "All Status" || order.status === selectedStatus;

      const matchesPayment =
        selectedPayment === "All Payment" ||
        order.paymentStatus === selectedPayment;

      return matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Oldest":
          return new Date(a.orderDate) - new Date(b.orderDate);
        case "AmountHigh":
          return b.total - a.total;
        case "AmountLow":
          return a.total - b.total;
        default:
          return new Date(b.orderDate) - new Date(a.orderDate);
      }
    });

  return (
    <div className="orders-page">
      <OrdersHeader setOpenAddModal={setOpenAddModal} />

      <OrdersFilters
        orders={orders}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <OrdersStats orders={filteredOrders} />

      <OrdersTable
        orders={filteredOrders}
        currentPage={currentPage}
        ordersPerPage={ORDERS_PER_PAGE}
        setOpenViewModal={setOpenViewModal}
        setOpenStatusModal={setOpenStatusModal}
        setOpenDeleteModal={setOpenDeleteModal}
        setOpenPrintModal={setOpenPrintModal}
        setSelectedOrder={setSelectedOrder}
      />

      <OrdersPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalOrders={filteredOrders.length}
        ordersPerPage={ORDERS_PER_PAGE}
      />

      {openAddModal && (
        <AddOrderModal
          setOpenAddModal={setOpenAddModal}
          refreshOrders={loadOrders}
        />
      )}

      {openViewModal && (
        <ViewOrderModal
          order={selectedOrder}
          setOpenViewModal={setOpenViewModal}
          setOpenStatusModal={setOpenStatusModal}
        />
      )}

      {openStatusModal && (
        <UpdateOrderStatusModal
          order={selectedOrder}
          refreshOrders={loadOrders}
          setOpenStatusModal={setOpenStatusModal}
        />
      )}

      {openDeleteModal && (
        <DeleteOrderModal
          order={selectedOrder}
          refreshOrders={loadOrders}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {openPrintModal && (
        <PrintInvoiceModal
          order={selectedOrder}
          setOpenPrintModal={setOpenPrintModal}
        />
      )}
    </div>
  );
};

export default Orders;
