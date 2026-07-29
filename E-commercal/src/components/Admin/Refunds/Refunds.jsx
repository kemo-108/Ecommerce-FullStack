import { useEffect, useState } from "react";
import "./Refunds.css";
import { toast } from "react-toastify";

import RefundStats from "./Sections/RefundStats/RefundStats";
import RefundToolbar from "./Sections/RefundToolbar/RefundToolbar";
import RefundFilters from "./Sections/RefundFilters/RefundFilters";
import RefundTable from "./Sections/RefundTable/RefundTable";
import RefundPagination from "./Sections/RefundPagination/RefundPagination";
import { GetAllRefunds } from "../../../services/RefundsService";

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const REFUNDS_PER_PAGE = 8;

const Refunds = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedReason, setSelectedReason] = useState("All Reasons");
  const [currentPage, setCurrentPage] = useState(1);

  const loadRefunds = async () => {
    setLoading(true);
    try {
      const data = await GetAllRefunds();
      setRefunds(
        data.map((r) => ({
          id: r.id,
          customer: r.customerName,
          avatar: r.customerAvatar,
          orderId: `#ORD- ${r.orderId}`,
          reason: r.reason,
          amount: r.amount,
          status: capitalize(r.status),
        })),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load refunds.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRefunds();
  }, []);

  const filteredRefunds = refunds.filter((refund) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      refund.customer?.toLowerCase().includes(term) ||
      refund.orderId.toLowerCase().includes(term);

    const matchesStatus =
      selectedStatus === "All Status" || refund.status === selectedStatus;

    const matchesReason =
      selectedReason === "All Reasons" || refund.reason === selectedReason;

    return matchesSearch && matchesStatus && matchesReason;
  });

  // Whenever the filters (or the underlying data) change, jump back to
  // page 1 so we never end up "stuck" on an empty page.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedReason]);

  const paginatedRefunds = filteredRefunds.slice(
    (currentPage - 1) * REFUNDS_PER_PAGE,
    currentPage * REFUNDS_PER_PAGE,
  );

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("All Status");
    setSelectedReason("All Reasons");
    setCurrentPage(1);
  };

  return (
    <div className="refunds">
      <RefundStats refunds={refunds} />

      <RefundToolbar refunds={filteredRefunds} />

      <RefundFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedReason={selectedReason}
        setSelectedReason={setSelectedReason}
        onReset={handleReset}
      />

      {loading ? (
        <p>Loading refunds...</p>
      ) : (
        <RefundTable refunds={paginatedRefunds} refreshRefunds={loadRefunds} />
      )}

      <RefundPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalRefunds={filteredRefunds.length}
        refundsPerPage={REFUNDS_PER_PAGE}
      />
    </div>
  );
};

export default Refunds;
