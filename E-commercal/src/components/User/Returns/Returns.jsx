import { useState } from "react";
import "./Returns.css";

import ReturnsHeader from "./Sections/ReturnsHeader/ReturnsHeader";
import ReturnsFilters from "./Sections/ReturnsFilters/ReturnsFilters";
import ReturnsTable from "./Sections/ReturnsTable/ReturnsTable";
import ReturnsPagination from "./Sections/ReturnsPagination/ReturnsPagination";

const RETURNS_DATA = [
  {
    id: 1,
    returnId: "RT10254",
    orderId: "ORD10254",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
    name: "Nike Air Max 270",
    qty: 1,
    total: 180,
    date: "15 Jul 2026",
    status: "Delivered",
  },
  {
    id: 2,
    returnId: "RT10255",
    orderId: "ORD10255",
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=300",
    name: "Adidas Ultraboost",
    qty: 2,
    total: 240,
    date: "11 Jul 2026",
    status: "Processing",
  },
  {
    id: 3,
    returnId: "RT10256",
    orderId: "ORD10256",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300",
    name: "Sony WH-1000XM5",
    qty: 1,
    total: 150,
    date: "08 Jul 2026",
    status: "Rejected",
  },
];

const Returns = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Latest");

  const filteredReturns = RETURNS_DATA.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      item.returnId.toLowerCase().includes(term) ||
      item.orderId.toLowerCase().includes(term);

    const matchesStatus =
      selectedStatus === "All Status" || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  }).sort((a, b) =>
    sortBy === "Oldest"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="returns-page">
      <ReturnsHeader />

      <ReturnsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <ReturnsTable items={filteredReturns} />

      <ReturnsPagination totalItems={filteredReturns.length} />
    </div>
  );
};

export default Returns;
