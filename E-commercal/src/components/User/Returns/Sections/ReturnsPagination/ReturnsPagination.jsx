import "./ReturnsPagination.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ReturnsPagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="returns-pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <FiChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default ReturnsPagination;
