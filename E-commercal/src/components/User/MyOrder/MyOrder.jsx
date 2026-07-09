import { useState } from "react";
import "./MyOrder.css";

import OrdersToolbar from "./Sections/OrdersToolbar/OrdersToolbar";
import OrdersList from "./Sections/OrdersList/OrdersList";
import OrderDetailsModal from "./Sections/OrderDetailsModal/OrderDetailsModal";

const MyOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="my-orders">
      <OrdersToolbar />

      <OrdersList setSelectedOrder={setSelectedOrder} />

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default MyOrder;
