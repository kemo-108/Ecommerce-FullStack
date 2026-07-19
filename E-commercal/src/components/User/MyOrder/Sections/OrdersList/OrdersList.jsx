import "./OrdersList.css";
import OrderRow from "../OrderRow/OrderRow";

const OrdersList = ({ orders, setSelectedOrder }) => {
  return (
    <div className="orders-table">
      <div className="table-head">
        <span>Product</span>

        <span>Order ID</span>

        <span>Date</span>

        <span>Total</span>

        <span>Status</span>

        <span>Action</span>
      </div>

      <div className="table-body">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderRow
              key={order.orderId}
              order={order}
              setSelectedOrder={setSelectedOrder}
            />
          ))
        ) : (
          <p className="orders-empty">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
