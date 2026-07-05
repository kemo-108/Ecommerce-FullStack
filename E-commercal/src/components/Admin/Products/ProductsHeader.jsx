import { FaPlus } from "react-icons/fa6";

const ProductsHeader = ({ setOpenAddModal }) => {
  return (
    <div className="products-header">
      <div className="products-title">
        <h2>Products</h2>
        <p>Manage all products in your store</p>
      </div>

      <button className="add-product-btn" onClick={() => setOpenAddModal(true)}>
        <FaPlus />
        Add New Product
      </button>
    </div>
  );
};

export default ProductsHeader;
