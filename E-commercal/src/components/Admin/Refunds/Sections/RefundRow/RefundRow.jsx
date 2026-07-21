import { useState } from "react";
import "./RefundRow.css";
import { toast } from "react-toastify";

import { FiCheck, FiX } from "react-icons/fi";
import { UpdateRefundStatus } from "../../../../../services/RefundsService";

const RefundRow = ({ refund, refreshRefunds }) => {
  const [busy, setBusy] = useState(false);

  const handleUpdateStatus = async (status) => {
    setBusy(true);
    try {
      await UpdateRefundStatus(refund.id, status);
      toast.success(`Refund ${status} successfully.`);
      await refreshRefunds();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update refund status."
      );
    } finally {
      setBusy(false);
    }
  };

  const isPending = refund.status?.toLowerCase() === "pending";

  return (
    <div className="refund-row">
      <div className="refund-customer">
        <img src={refund.avatar} alt={refund.customer} />

        <div>
          <h4>{refund.customer}</h4>

          <span>Customer</span>
        </div>
      </div>

      <span>{refund.orderId}</span>

      <span>{refund.reason}</span>

      <strong>${Number(refund.amount).toFixed(2)}</strong>

      <span className={`refund-status ${refund.status.toLowerCase()}`}>
        {refund.status}
      </span>

      <div className="refund-actions">
        {isPending ? (
          <>
            <button
              className="approve-btn"
              onClick={() => handleUpdateStatus("approved")}
              disabled={busy}
            >
              <FiCheck />
            </button>

            <button
              className="reject-btn"
              onClick={() => handleUpdateStatus("rejected")}
              disabled={busy}
            >
              <FiX />
            </button>
          </>
        ) : (
          <span className="refund-decided">Decided</span>
        )}
      </div>
    </div>
  );
};

export default RefundRow;
