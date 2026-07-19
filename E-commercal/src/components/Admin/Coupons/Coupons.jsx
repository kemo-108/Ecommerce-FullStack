import { useEffect, useMemo, useState } from "react";

import "./Coupons.css";
import { toast } from "react-toastify";

import { getCoupons } from "../../../services/CouponsService";
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
  const [coupons, setCoupons] = useState([]);

  const loadCoupons = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load coupons."
      );
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

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
          refreshCoupons={loadCoupons}
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
          refreshCoupons={loadCoupons}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      {openDeleteModal && (
        <DeleteCouponModal
          coupon={selectedCoupon}
          refreshCoupons={loadCoupons}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}
    </div>
  );
};

export default Coupons;
