import "./PrintInvoiceModal.css";

import { FiPrinter, FiX } from "react-icons/fi";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Invoice from "./Invoice";

const PrintInvoiceModal = ({ order, setOpenPrintModal }) => {
  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice-${order?.orderId}`,
  });

  if (!order) return null;

  return (
    <div className="invoice-overlay">
      <div className="invoice-modal">
        {/* ================= Toolbar ================= */}

        <div className="invoice-toolbar">
          <div className="invoice-title">
            <h2>Invoice Preview</h2>

            <span>Order #{order.orderId}</span>
          </div>

          <div className="invoice-actions">
            <button className="invoice-print-btn" onClick={handlePrint}>
              <FiPrinter />
              <span>Print Invoice</span>
            </button>

            <button
              className="invoice-close-btn"
              onClick={() => setOpenPrintModal(false)}
            >
              <FiX />
            </button>
          </div>
        </div>

        {/* ================= Preview ================= */}

        <div className="invoice-preview">
          <div ref={invoiceRef} className="invoice-print-wrapper">
            {" "}
            <Invoice order={order} />
          </div>
        </div>

        {/* ================= Footer ================= */}

        <div className="invoice-bottom">
          <p>
            This invoice is generated automatically by
            <strong> ART CORNER Dashboard</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoiceModal;
