import "./RefundToolbar.css";
import { FiDownload } from "react-icons/fi";

const RefundToolbar = ({ refunds = [] }) => {
  const handleExport = () => {
    if (refunds.length === 0) return;

    const headers = ["Customer", "Order", "Reason", "Amount", "Status"];
    const rows = refunds.map((r) => [
      r.customer,
      r.orderId,
      r.reason,
      r.amount,
      r.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `" ${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `refunds- ${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="refund-toolbar">
      <div className="refund-toolbar-content">
        <h2>Refund Requests</h2>

        <p>
          Manage customer refund requests and keep track of their current
          status.
        </p>
      </div>

      <button className="export-btn" onClick={handleExport}>
        <FiDownload />
        Export
      </button>
    </div>
  );
};

export default RefundToolbar;
