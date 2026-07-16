import "./OrdersTable.css";
import OrderRow from "./OrderRow";
import { MdPadding } from "react-icons/md";

const OrdersTable = ({
  orders,
  currentPage,
  ordersPerPage,
  setOpenViewModal,
  setOpenStatusModal,
  setOpenDeleteModal,
  setOpenPrintModal,
  setSelectedOrder,
}) => {
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;

  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  return (
    <div className="orders-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <OrderRow
                key={order.orderId}
                order={order}
                setOpenViewModal={setOpenViewModal}
                setOpenStatusModal={setOpenStatusModal}
                setOpenDeleteModal={setOpenDeleteModal}
                setOpenPrintModal={setOpenPrintModal}
                setSelectedOrder={setSelectedOrder}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="orders-no-data">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
