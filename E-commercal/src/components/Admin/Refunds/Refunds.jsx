import { useState } from "react";
import "./Refunds.css";

import RefundStats from "./Sections/RefundStats/RefundStats";
import RefundToolbar from "./Sections/RefundToolbar/RefundToolbar";
import RefundFilters from "./Sections/RefundFilters/RefundFilters";
import RefundTable from "./Sections/RefundTable/RefundTable";
import RefundPagination from "./Sections/RefundPagination/RefundPagination";

const REFUNDS_DATA = [
  {
    id: 1,
    customer: "Ahmed Mohamed",
    avatar: "https://i.pravatar.cc/100?img=11",
    orderId: "#ORD-10245",
    products: 2,
    reason: "Wrong Size",
    amount: 180,
    status: "Pending",
  },
  {
    id: 2,
    customer: "Khaled Ali",
    avatar: "https://i.pravatar.cc/100?img=12",
    orderId: "#ORD-10246",
    products: 1,
    reason: "Damaged Item",
    amount: 95,
    status: "Approved",
  },
  {
    id: 3,
    customer: "Sara Ahmed",
    avatar: "https://i.pravatar.cc/100?img=32",
    orderId: "#ORD-10247",
    products: 3,
    reason: "Changed Mind",
    amount: 240,
    status: "Rejected",
  },
  {
    id: 4,
    customer: "Mohamed Hassan",
    avatar: "https://i.pravatar.cc/100?img=15",
    orderId: "#ORD-10248",
    products: 1,
    reason: "Wrong Product",
    amount: 130,
    status: "Pending",
  },
];

const Refunds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedReason, setSelectedReason] = useState("All Reasons");

  const filteredRefunds = REFUNDS_DATA.filter((refund) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      refund.customer.toLowerCase().includes(term) ||
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
      <RefundStats refunds={filteredRefunds} />

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

      <RefundTable refunds={filteredRefunds} />

      <RefundPagination totalRefunds={filteredRefunds.length} />
    </div>
  );
};

export default Refunds;
