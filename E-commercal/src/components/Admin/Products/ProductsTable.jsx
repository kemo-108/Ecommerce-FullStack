import ProductRow from "./ProductRow";

const ProductsTable = ({
  products,
  currentPage,
  productsPerPage,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedProduct,
}) => {
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  return (
    <div className="products-table">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductRow
                key={product.productId}
                product={product}
                setOpenViewModal={setOpenViewModal}
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
                setSelectedProduct={setSelectedProduct}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
