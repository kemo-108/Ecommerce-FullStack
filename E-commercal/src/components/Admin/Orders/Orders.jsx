import { useState } from "react";

import "./Orders.css";

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

  // Dummy Data (هنستبدله بالـ API بعدين)
  const orders = [
    {
      orderId: 1001,
      customerName: "Ahmed Mohamed",
      customerEmail: "ahmed@gmail.com",
      customerImage: "https://i.pravatar.cc/150?img=1",
      total: 1240,
      paymentStatus: "Paid",
      status: "Delivered",
      orderDate: "01 Jul 2026",
    },
    {
      orderId: 1002,
      customerName: "Sara Ali",
      customerEmail: "sara@gmail.com",
      customerImage: "https://i.pravatar.cc/150?img=5",
      total: 350,
      paymentStatus: "Pending",
      status: "Pending",
      orderDate: "30 Jun 2026",
    },
    {
      orderId: 1003,
      customerName: "Mohamed Adel",
      customerEmail: "adel@gmail.com",
      customerImage: "",
      total: 890,
      paymentStatus: "Paid",
      status: "Processing",
      orderDate: "30 Jun 2026",
    },
    {
      orderId: 1004,
      customerName: "Nada Hassan",
      customerEmail: "nada@gmail.com",
      customerImage: "https://i.pravatar.cc/150?img=9",
      total: 2200,
      paymentStatus: "Paid",
      status: "Delivered",
      orderDate: "29 Jun 2026",
    },
    {
      orderId: 1005,
      customerName: "Omar Tarek",
      customerEmail: "omar@gmail.com",
      customerImage: "",
      total: 175,
      paymentStatus: "Failed",
      status: "Cancelled",
      orderDate: "29 Jun 2026",
    },
    {
      orderId: 1006,
      customerName: "Youssef Samir",
      customerEmail: "youssef@gmail.com",
      customerImage: "https://i.pravatar.cc/150?img=12",
      total: 960,
      paymentStatus: "Paid",
      status: "Delivered",
      orderDate: "28 Jun 2026",
    },
    {
      orderId: 1007,
      customerName: "Mariam Ahmed",
      customerEmail: "mariam@gmail.com",
      customerImage: "",
      total: 640,
      paymentStatus: "Pending",
      status: "Processing",
      orderDate: "28 Jun 2026",
    },
    {
      orderId: 1008,
      customerName: "Karim Mostafa",
      customerEmail: "karim@gmail.com",
      customerImage: "https://i.pravatar.cc/150?img=15",
      total: 3100,
      paymentStatus: "Paid",
      status: "Delivered",
      orderDate: "27 Jun 2026",
    },
  ];

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

      {openAddModal && <AddOrderModal setOpenAddModal={setOpenAddModal} />}

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
          setOpenStatusModal={setOpenStatusModal}
        />
      )}

      {openDeleteModal && (
        <DeleteOrderModal
          order={selectedOrder}
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
