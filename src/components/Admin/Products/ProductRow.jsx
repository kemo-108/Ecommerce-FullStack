import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const getStockInfo = (qty) => {
  if (qty === 0) return { label: "Out Of Stock", className: "out-of-stock" };
  if (qty <= 10) return { label: "Low Stock", className: "low-stock" };
  return { label: "In Stock", className: "in-stock" };
};

const ProductRow = ({
  product,
  setOpenViewModal,
  setOpenEditModal,
  setOpenDeleteModal,
  setSelectedProduct,
}) => {
  const stock = getStockInfo(product.qty);

  return (
    <tr>
      <td className="product-info">
        <img
          src={`https://localhost:7069/${product.imageUrl}`}
          alt={product.productName}
        />

        <div>
          <h4>{product.productName}</h4>
          <span>{product.code}</span>
        </div>
      </td>

      <td>{product.category}</td>

      <td className="price">${Number(product.price || 0).toFixed(2)}</td>

      <td>{product.qty}</td>

      <td>
        <span className={`status ${stock.className}`}>{stock.label}</span>
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
