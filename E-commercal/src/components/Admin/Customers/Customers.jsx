import { useEffect, useState } from "react";

import "./Customers.css";
import CustomersEmptyState from "./CustomersEmptyState";
import CustomersHeader from "./CustomersHeader";
import CustomersFilters from "./CustomersFilters";
import CustomersStats from "./CustomersStats";
import CustomersTable from "./CustomersTable";
import CustomersPagination from "./CustomersPagination";
import CustomersResults from "./CustomersResults";
import ViewCustomerModal from "./Modal/ViewCustomerModal/ViewCustomerModal";
import EditCustomerModal from "./Modal/EditCustomerModal/EditCustomerModal";
import DeleteCustomerModal from "./Modal/DeleteCustomerModal/DeleteCustomerModal";
import AddCustomerModal from "./Modal/AddCustomerModal/AddCustomerModal";
const Customers = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [customer, setSelectedCustomer] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [selectedType, setSelectedType] = useState("All Types");

  const [sortBy, setSortBy] = useState("Newest");

  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 8;

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(dummyCustomers);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedType, sortBy]);

  // Dummy Data
  const dummyCustomers = [
    {
      customerId: 1,
      customerName: "Ahmed Mohamed",
      email: "ahmed@gmail.com",
      phone: "+20 101 234 5678",
      avatar: "https://i.pravatar.cc/150?img=11",
      totalOrders: 14,
      totalSpent: 2340,
      status: "Active",
      type: "VIP",
      joined: "28 Jun 2026",
    },
    {
      customerId: 2,
      customerName: "Sara Ali",
      email: "sara@gmail.com",
      phone: "+20 100 987 6543",
      avatar: "https://i.pravatar.cc/150?img=32",
      totalOrders: 7,
      totalSpent: 890,
      status: "Active",
      type: "VIP",
      joined: "25 Jun 2026",
    },
    {
      customerId: 3,
      customerName: "Omar Tarek",
      email: "omar@gmail.com",
      phone: "+20 111 222 3333",
      avatar: "https://i.pravatar.cc/150?img=13",
      totalOrders: 2,
      totalSpent: 210,
      status: "Blocked",
      type: "New",
      joined: "20 Jun 2026",
    },
    {
      customerId: 4,
      customerName: "Mona Hassan",
      email: "mona@gmail.com",
      phone: "+20 106 555 4444",
      avatar: "https://i.pravatar.cc/150?img=47",
      totalOrders: 5,
      totalSpent: 560,
      status: "Active",
      type: "Regular",
      joined: "18 Jun 2026",
    },
    {
      customerId: 5,
      customerName: "Youssef Ahmed",
      email: "youssef@gmail.com",
      phone: "+20 109 876 5432",
      avatar: "https://i.pravatar.cc/150?img=15",
      totalOrders: 12,
      totalSpent: 1450,
      status: "Active",
      type: "VIP",
      joined: "15 Jun 2026",
    },
  ];
  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase().trim();

    const matchesSearch =
      customer.customerName.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.toLowerCase().includes(term);

    const matchesStatus =
      selectedStatus === "All Status" || customer.status === selectedStatus;

    const matchesType =
      selectedType === "All Types" || customer.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "Newest":
        return b.customerId - a.customerId;

      case "Oldest":
        return a.customerId - b.customerId;

      case "OrdersHigh":
        return b.totalOrders - a.totalOrders;

      case "OrdersLow":
        return a.totalOrders - b.totalOrders;

      case "SpentHigh":
        return b.totalSpent - a.totalSpent;

      case "SpentLow":
        return a.totalSpent - b.totalSpent;
      case "NameAsc":
        return a.customerName.localeCompare(b.customerName);

      case "NameDesc":
        return b.customerName.localeCompare(a.customerName);
      default:
        return 0;
    }
  });

  return (
    <div className="customers-page">
      <CustomersHeader setOpenAddModal={setOpenAddModal} />
      <CustomersFilters
        customers={customers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <CustomersStats customers={customers} />
      {sortedCustomers.length > 0 ? (
        <>
          <CustomersTable
            customers={sortedCustomers}
            currentPage={currentPage}
            customersPerPage={customersPerPage}
            setSelectedCustomer={setSelectedCustomer}
            setOpenViewModal={setOpenViewModal}
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />

          <CustomersPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCustomers={sortedCustomers.length}
            customersPerPage={customersPerPage}
          />
        </>
      ) : (
        <CustomersEmptyState
          setSearchTerm={setSearchTerm}
          setSelectedStatus={setSelectedStatus}
          setSelectedType={setSelectedType}
        />
      )}
      {openViewModal && (
        <ViewCustomerModal
          customer={customer}
          setOpenViewModal={setOpenViewModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}
      {openEditModal && (
        <EditCustomerModal
          customer={customer}
          customers={customers}
          setCustomers={setCustomers}
          setOpenEditModal={setOpenEditModal}
        />
      )}
      {openDeleteModal && (
        <DeleteCustomerModal
          customer={customer}
          customers={customers}
          setCustomers={setCustomers}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {openAddModal && (
        <AddCustomerModal
          setOpenAddModal={setOpenAddModal}
          setCustomers={setCustomers}
          customers={customers}
        />
      )}{" "}
    </div>
  );
};

export default Customers;
