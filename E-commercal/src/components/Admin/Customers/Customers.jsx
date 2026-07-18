import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./Customers.css";
import { getCustomers } from "../../../services/CustomersService";
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
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedType, sortBy]);

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
          refreshCustomers={loadCustomers}
          setOpenEditModal={setOpenEditModal}
        />
      )}
      {openDeleteModal && (
        <DeleteCustomerModal
          customer={customer}
          refreshCustomers={loadCustomers}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
      {openAddModal && (
        <AddCustomerModal
          setOpenAddModal={setOpenAddModal}
          refreshCustomers={loadCustomers}
        />
      )}{" "}
    </div>
  );
};

export default Customers;
