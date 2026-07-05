const ProductsPagination = ({
  currentPage,
  setCurrentPage,
  totalProducts,
  productsPerPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const start =
    totalProducts === 0 ? 0 : (currentPage - 1) * productsPerPage + 1;

  const end = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div className="products-footer">
      <p>
        Showing <strong>{start}</strong> to <strong>{end}</strong> of{" "}
        <strong>{totalProducts}</strong> products
      </p>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          {"<"}
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
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductsPagination;
