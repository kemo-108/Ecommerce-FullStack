import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "./CategoriesPagination.css";

const CategoriesPagination = ({
  currentPage,
  setCurrentPage,
  totalCategories,
  categoriesPerPage,
}) => {
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="categories-pagination">
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <FiChevronLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page-number ${currentPage === page ? "active" : ""}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
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

export default CategoriesPagination;
