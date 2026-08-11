import "./OrdersPagination.css";

const OrdersPagination = ({
  currentPage,
  setCurrentPage,
  totalOrders,
  ordersPerPage,
}) => {
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="orders-pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      <div className="pagination-numbers">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-number ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default OrdersPagination;
