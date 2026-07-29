import Products from "../../../../Admin/Products/Products";
import Product from "../../../../Product/Product";
import "./OrderRow.css";
import { useState } from "react";
import { FiEye, FiRotateCw } from "react-icons/fi";
import { AddToCart } from "../../../../../services/CartService";
import { DeleteMyOrder } from "../../../../../services/OrderService";
import { toast } from "react-toastify";

const OrderRow = ({ order, setSelectedOrder, onOrderRemoved }) => {
  const [reordering, setReordering] = useState(false);
  const firstItem = order.items?.[0];
  const totalQuantity =
    order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const extraItemsCount = (order.items?.length || 0) - 1;

  return (
    <div className="order-row">
      <div className="order-product">
        <img
          src={
            firstItem?.imageUrl
              ? `https://localhost:7069/ ${Product.imageUrl}`
              : ""
          }
          alt={firstItem?.productName}
        />
        <div>
          <h4>
            {firstItem?.productName}
            {extraItemsCount > 0 && ` + ${extraItemsCount} more`}
          </h4>

          <span>Qty : {totalQuantity}</span>
        </div>
      </div>

      <div className="order-id">#{order.orderId}</div>

      <div className="order-date">
        {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : ""}
      </div>

      <div className="order-total"> EGP {Number(order.total).toFixed(2)}</div>

      <div className={`order-status  ${order.status?.toLowerCase()}`}>
        {order.status}
      </div>

      <div className="order-actions">
        <button className="view-btn" onClick={() => setSelectedOrder(order)}>
          <FiEye />
        </button>

        <button
          className="again-btn"
          title="Buy Again"
          disabled={reordering}
          onClick={async () => {
            if (!order.items?.length) return;
            setReordering(true);
            try {
              await Promise.all(
                order.items.map((item) =>
                  AddToCart({
                    productId: item.productId,
                    productName: item.productName,
                    imageUrl: item.imageUrl,
                    price: item.price,
                    qty: item.quantity,
                  }),
                ),
              );
              await DeleteMyOrder(order.orderId);
              toast.success("Items added to your cart");
              onOrderRemoved?.(order.orderId);
            } catch {
              toast.error("Could not add these items to your cart");
            } finally {
              setReordering(false);
            }
          }}
        >
          <FiRotateCw />
        </button>
      </div>
    </div>
  );
};

export default OrderRow;
