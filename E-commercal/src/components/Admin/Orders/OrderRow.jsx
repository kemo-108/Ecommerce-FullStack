import { FiEye, FiEdit2, FiTrash2, FiPrinter } from "react-icons/fi";
import "./OrderRow.css";

const OrderRow = ({
  order,
  setOpenViewModal,
  setOpenStatusModal,
  setOpenDeleteModal,
  setOpenPrintModal,
  setSelectedOrder,
}) => {
  const handleView = () => {
    setSelectedOrder(order);
    setOpenViewModal(true);
  };

  const handleStatus = () => {
    setSelectedOrder(order);
    setOpenStatusModal(true);
  };

  const handleDelete = () => {
    setSelectedOrder(order);
    setOpenDeleteModal(true);
  };
  const handlePrint = () => {
    setSelectedOrder(order);
    setOpenPrintModal(true);
  };
  const firstLetter = order.customerName
    ? order.customerName.charAt(0).toUpperCase()
    : "?";

  return (
    <tr className="admin-order-row">
  <td>
    <span className="order-id">#{order.orderId}</span>
  </td>

  <td>
    <div className="admin-order-customer">
      {order.customerImage ? (
        <img src={order.customerImage} alt={order.customerName} />
      ) : (
        <div className="customer-avatar">{firstLetter}</div>
      )}

      <div>
        <h4>{order.customerName}</h4>
        <span>{order.customerEmail}</span>
      </div>
    </div>
  </td>

  <td className="admin-order-total"> ${Number(order.total).toFixed(2)}</td>

  <td>
    <span className={`payment-badge  ${order.paymentStatus.toLowerCase()}`}>
      {order.paymentStatus}
    </span>
  </td>

  <td>
    <span className={`status-badge  ${order.status.toLowerCase()}`}>
      {order.status}
    </span>
  </td>

  <td className="admin-order-date">{order.orderDate}</td>

  <td>
    <div className="admin-order-actions">
      <button className="order-action-btn order-view-btn" onClick={handleView} title="View">
        <FiEye />
      </button>
      <button className="order-action-btn order-print-btn" onClick={handlePrint} title="Print Invoice">
        <FiPrinter />
      </button>
      <button className="order-action-btn order-edit-btn" onClick={handleStatus} title="Update Status">
        <FiEdit2 />
      </button>
      <button className="order-action-btn order-delete-btn" onClick={handleDelete} title="Delete">
        <FiTrash2 />
      </button>
    </div>
  </td>
</tr>
  );
};

export default OrderRow;