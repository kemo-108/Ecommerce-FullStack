import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const ProductRow = ({
  product,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedProduct,
}) => {
  return (
    <tr>
      <td className="product-info">
        <img
          src={`https://localhost:7005/${product.imageUrl}`}
          alt={product.productName}
        />
        <div>
          <h4>{product.productName}</h4>
          <span>{product.code}</span>
        </div>
      </td>

      <td>{product.category}</td>

      <td className="price">{product.price}</td>

      <td>{product.qty}</td>

      <td>
        <span
          className={`status ${product.qty > 10 ? "in-stock" : "low-stock"}`}
        >
          {product.qty > 10 ? "In Stock" : "Low Stock"}
        </span>
      </td>

      <td>{product.createdAt}</td>

      <td>
        <div className="actions">
          <button
            className="view-btn"
            onClick={() => {
              setSelectedProduct(product);
              setOpenViewModal(true);
            }}
          >
            <FiEye />
          </button>

          <button
            className="edit-btn"
            onClick={() => {
              setSelectedProduct(product);
              setOpenEditModal(true);
            }}
          >
            <FiEdit />
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setSelectedProduct(product);
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
