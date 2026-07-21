import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import "./RequestReturnModal.css";

import { GetMyOrders } from "../../../../../services/OrderService";
import { CreateReturn } from "../../../../../services/ReturnsService";

const RequestReturnModal = ({ onClose, onCreated }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [quantities, setQuantities] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    GetMyOrders()
      .then((data) => {
        // Only orders that have actually been delivered can be returned.
        setOrders(data.filter((o) => o.status === "Delivered"));
      })
      .catch(() => {});
  }, []);

  const selectedOrder = orders.find((o) => o.orderId === Number(selectedOrderId));

  const handleQtyChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedOrderId || !reason.trim()) {
      toast.error("Please select an order and enter a reason.");
      return;
    }

    const items = Object.entries(quantities)
      .filter(([, qty]) => Number(qty) > 0)
      .map(([productId, qty]) => ({
        productId: Number(productId),
        quantity: Number(qty),
      }));

    if (items.length === 0) {
      toast.error("Select at least one item and quantity to return.");
      return;
    }

    const total = selectedOrder.items
      .filter((item) => quantities[item.productId] > 0)
      .reduce(
        (sum, item) => sum + item.price * Number(quantities[item.productId]),
        0
      );

    setSaving(true);
    try {
      await CreateReturn({
        orderId: Number(selectedOrderId),
        reason,
        total,
        items,
      });
      toast.success("Return request submitted successfully.");
      onCreated();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit return request."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="return-modal-overlay" onClick={onClose}>
      <div className="return-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Request a Return</h2>
          <button onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="input-group">
            <label>Select Order</label>
            <select
              value={selectedOrderId}
              onChange={(e) => {
                setSelectedOrderId(e.target.value);
                setQuantities({});
              }}
            >
              <option value="">-- Select a delivered order --</option>
              {orders.map((order) => (
                <option key={order.orderId} value={order.orderId}>
                  #{order.orderId} - ${Number(order.total).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {selectedOrder && (
            <div className="return-items">
              {selectedOrder.items.map((item) => (
                <div className="return-item-row" key={item.productId}>
                  <span>{item.productName}</span>
                  <input
                    type="number"
                    min="0"
                    max={item.quantity}
                    placeholder="Qty to return"
                    value={quantities[item.productId] || ""}
                    onChange={(e) =>
                      handleQtyChange(item.productId, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}

          <div className="input-group">
            <label>Reason</label>
            <textarea
              rows="3"
              placeholder="Why are you returning this?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit} disabled={saving}>
            {saving ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestReturnModal;
