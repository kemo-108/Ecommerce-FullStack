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

const Refunds = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedReason, setSelectedReason] = useState("All Reasons");

  const loadRefunds = async () => {
    setLoading(true);
    try {
      const data = await GetAllRefunds();
      setRefunds(
        data.map((r) => ({
          id: r.id,
          customer: r.customerName,
          avatar: r.customerAvatar,
          orderId: `#ORD-${r.orderId}`,
          reason: r.reason,
          amount: r.amount,
          status: capitalize(r.status),
        }))
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

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("All Status");
    setSelectedReason("All Reasons");
  };

  return (
    <div className="refunds">
      <RefundStats refunds={refunds} />

      <RefundToolbar />

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
        <RefundTable refunds={filteredRefunds} refreshRefunds={loadRefunds} />
      )}

      <RefundPagination totalRefunds={filteredRefunds.length} />
    </div>
  );
};

export default Refunds;
