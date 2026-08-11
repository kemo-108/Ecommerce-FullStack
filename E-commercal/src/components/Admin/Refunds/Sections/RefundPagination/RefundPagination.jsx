import "./RefundPagination.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const RefundPagination = ({
  currentPage,
  setCurrentPage,
  totalRefunds,
  refundsPerPage,
}) => {
  const totalPages = Math.ceil(totalRefunds / refundsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="refund-pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <FiChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default RefundPagination;
