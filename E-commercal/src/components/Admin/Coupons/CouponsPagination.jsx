import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "./CouponsPagination.css";

const CouponsPagination = ({
  currentPage,
  setCurrentPage,
  totalCoupons,
  couponsPerPage,
}) => {
  const totalPages = Math.ceil(totalCoupons / couponsPerPage);

  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages)].map((_, index) => index + 1);

  return (
    <div className="coupons-pagination">
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

export default CouponsPagination;
