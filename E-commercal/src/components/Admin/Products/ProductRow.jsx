import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const ProductRow = ({
  Product,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedProduct,
}) => {
  return (
    <tr>
      <td className="Product-info">
        <img
          src={`https://localhost:7069/${Product.imageUrl}`}
          alt={Product.ProductName}
        />
        <div>
          <h4>{Product.ProductName}</h4>
          <span>{Product.code}</span>
        </div>
      </td>

      <td>{Product.category}</td>

      <td className="price">{Product.price}</td>

      <td>{Product.qty}</td>

      <td>
        <span
          className={`status ${Product.qty > 10 ? "in-stock" : "low-stock"}`}
        >
          {Product.qty > 10 ? "In Stock" : "Low Stock"}
        </span>
      </td>

      <td>{Product.createdAt}</td>

      <td>
        <div className="actions">
          <button
            className="view-btn"
            onClick={() => {
              setSelectedProduct(Product);
              setOpenViewModal(true);
            }}
          >
            <FiEye />
          </button>

          <button
            className="edit-btn"
            onClick={() => {
              setSelectedProduct(Product);
              setOpenEditModal(true);
            }}
          >
            <FiEdit />
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setSelectedProduct(Product);
              setOpenDeleteModal(true);
            }}
          >
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
