import "./CustomersPagination.css";

const CustomersPagination = ({
  currentPage,
  setCurrentPage,
  totalCustomers,
  customersPerPage,
}) => {
  const totalPages = Math.ceil(totalCustomers / customersPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="customers-pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>

      <div className="pagination-pages">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
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

export default CustomersPagination;
