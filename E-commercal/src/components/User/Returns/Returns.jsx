import { useEffect, useState } from "react";
import "./Returns.css";
import { toast } from "react-toastify";

import ReturnsHeader from "./Sections/ReturnsHeader/ReturnsHeader";
import ReturnsFilters from "./Sections/ReturnsFilters/ReturnsFilters";
import ReturnsTable from "./Sections/ReturnsTable/ReturnsTable";
import ReturnsPagination from "./Sections/ReturnsPagination/ReturnsPagination";
import RequestReturnModal from "./Sections/RequestReturnModal/RequestReturnModal";
import { GetMyReturns } from "../../../services/ReturnsService";

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const Returns = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [sortBy, setSortBy] = useState("Latest");

  const loadReturns = async () => {
    setLoading(true);
    try {
      const data = await GetMyReturns();
      setReturns(
        data.map((r) => ({
          id: r.returnId,
          returnId: `RT${r.returnId}`,
          orderId: `ORD${r.orderId}`,
          image: r.items?.[0]?.imageUrl,
          name:
            r.items?.length > 1
              ? `${r.items[0].productName} +${r.items.length - 1} more`
              : r.items?.[0]?.productName,
          qty: r.qty,
          total: r.total,
          date: r.date,
          displayDate: r.date
            ? new Date(r.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "",
          status: capitalize(r.status),
        }))
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load returns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReturns();
  }, []);

  const filteredReturns = returns
    .filter((item) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.returnId.toLowerCase().includes(term) ||
        item.orderId.toLowerCase().includes(term);

      const matchesStatus =
        selectedStatus === "All Status" || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) =>
      sortBy === "Oldest"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="returns-page">
      <ReturnsHeader onRequestReturn={() => setOpenModal(true)} />

      <ReturnsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading ? (
        <p>Loading returns...</p>
      ) : (
        <ReturnsTable items={filteredReturns} />
      )}

      <ReturnsPagination totalItems={filteredReturns.length} />

      {openModal && (
        <RequestReturnModal
          onClose={() => setOpenModal(false)}
          onCreated={loadReturns}
        />
      )}
    </div>
  );
};

export default Returns;
