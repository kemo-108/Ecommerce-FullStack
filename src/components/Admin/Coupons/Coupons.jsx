import { useMemo, useState } from "react";

import "./Coupons.css";

import CouponsHeader from "./CouponsHeader";
import CouponsFilters from "./CouponsFilters";
import CouponsStats from "./CouponsStats";
import CouponsTable from "./CouponsTable";
import CouponsPagination from "./CouponsPagination";

import AddCouponModal from "./Modal/AddCouponModal/AddCouponModal";
import ViewCouponModal from "./Modal/ViewCouponModal/ViewCouponModal";
import EditCouponModal from "./Modal/EditCouponModal/EditCouponModal";
import DeleteCouponModal from "./Modal/DeleteCouponModal/DeleteCouponModal";

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SUMMER25",
      description: "Summer Sale Discount",
      discountType: "Percentage",
      discountValue: 25,
      usage: 124,
      usageLimit: 500,
      minOrder: 300,
      maxDiscount: 500,
      expiryDate: "30 Jul 2026",
      status: "Active",
    },
    {
      id: 2,
      code: "WELCOME10",
      description: "New Customer Offer",
      discountType: "Percentage",
      discountValue: 10,
      usage: 320,
      usageLimit: 1000,
      minOrder: 200,
      maxDiscount: 250,
      expiryDate: "15 Jul 2026",
      status: "Active",
    },
    {
      id: 3,
      code: "FREESHIP",
      description: "Shipping Discount",
      discountType: "Fixed Amount",
      discountValue: 75,
      usage: 89,
      usageLimit: 200,
      minOrder: 500,
      maxDiscount: 75,
      expiryDate: "10 Jun 2026",
      status: "Expired",
    },
    {
      id: 4,
      code: "NEWYEAR30",
      description: "New Year Offer",
      discountType: "Percentage",
      discountValue: 30,
      usage: 500,
      usageLimit: 500,
      minOrder: 500,
      maxDiscount: 800,
      expiryDate: "31 Jan 2026",
      status: "Expired",
    },
    {
      id: 5,
      code: "FLASH20",
      description: "Flash Sale",
      discountType: "Percentage",
      discountValue: 20,
      usage: 0,
      usageLimit: 300,
      minOrder: 250,
      maxDiscount: 300,
      expiryDate: "10 Aug 2026",
      status: "Scheduled",
    },
  ]);

  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const COUPONS_PER_PAGE = 8;

  const filteredCoupons = useMemo(() => {
    let data = [...coupons];

    // Search
    if (searchTerm.trim()) {
      data = data.filter(
        (coupon) =>
          coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coupon.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Status
    if (selectedStatus !== "All Status") {
      data = data.filter((coupon) => coupon.status === selectedStatus);
    }

    // Type
    if (selectedType !== "All Types") {
      data = data.filter((coupon) => coupon.discountType === selectedType);
    }

    // Sort
    switch (sortBy) {
      case "Code A-Z":
        data.sort((a, b) => a.code.localeCompare(b.code));
        break;

      case "Code Z-A":
        data.sort((a, b) => b.code.localeCompare(a.code));
        break;

      case "Highest Discount":
        data.sort((a, b) => b.discountValue - a.discountValue);
        break;

      case "Lowest Discount":
        data.sort((a, b) => a.discountValue - b.discountValue);
        break;

      default:
        break;
    }

    return data;
  }, [coupons, searchTerm, selectedStatus, selectedType, sortBy]);

  const lastIndex = currentPage * COUPONS_PER_PAGE;
  const firstIndex = lastIndex - COUPONS_PER_PAGE;

  const currentCoupons = filteredCoupons.slice(firstIndex, lastIndex);

  return (
    <div className="coupons-page">
      <CouponsHeader setOpenAddModal={setOpenAddModal} />

      <CouponsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <CouponsStats coupons={coupons} />

      <CouponsTable
        coupons={currentCoupons}
        setSelectedCoupon={setSelectedCoupon}
        setOpenViewModal={setOpenViewModal}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <CouponsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalCoupons={filteredCoupons.length}
        couponsPerPage={COUPONS_PER_PAGE}
      />

      {openAddModal && (
        <AddCouponModal
          setOpenAddModal={setOpenAddModal}
          setCoupons={setCoupons}
        />
      )}

      {openViewModal && (
        <ViewCouponModal
          coupon={selectedCoupon}
          setOpenViewModal={setOpenViewModal}
        />
      )}

      {openEditModal && (
        <EditCouponModal
          coupon={selectedCoupon}
          setCoupons={setCoupons}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      {openDeleteModal && (
        <DeleteCouponModal
          coupon={selectedCoupon}
          setCoupons={setCoupons}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </div>
  );
};

export default Coupons;
