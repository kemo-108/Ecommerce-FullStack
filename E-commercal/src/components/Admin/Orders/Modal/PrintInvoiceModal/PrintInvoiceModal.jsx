import "./PrintInvoiceModal.css";

import { FiPrinter, FiX } from "react-icons/fi";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import Invoice from "./Invoice";

// A4 page height in pixels at 96dpi, with a small safety margin
// so rounding never pushes content onto a second page.
const A4_HEIGHT_PX = 1122.5 * 0.97;

const PrintInvoiceModal = ({ order, setOpenPrintModal }) => {
  const invoiceRef = useRef(null); // the printed page (outer box)
  const contentRef = useRef(null); // the actual invoice content (gets scaled)

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Invoice- ${order?.orderId}`,

    // Runs right before the print dialog opens.
    // Measures the invoice height and shrinks it just enough
    // to guarantee it always prints on a single page.
    onBeforePrint: () => {
      return new Promise((resolve) => {
        const page = invoiceRef.current;
        const content = contentRef.current;

        if (page && content) {
          // Reset any leftover scaling before measuring
          content.style.transform = "none";
          page.style.height = "auto";

          const naturalHeight = content.scrollHeight;
          const scale =
            naturalHeight > A4_HEIGHT_PX ? A4_HEIGHT_PX / naturalHeight : 1;

          content.style.transformOrigin = "top center";
          content.style.transform = `scale( ${scale})`;

          // Shrink the page box to match the scaled content so the
          // browser doesn't leave a blank second page behind it.
          page.style.height = ` ${naturalHeight * scale}px`;
          page.style.overflow = "hidden";
        }

        requestAnimationFrame(() => resolve());
      });
    },

    // Restore normal on-screen sizing after printing/cancelling.
    onAfterPrint: () => {
      const page = invoiceRef.current;
      const content = contentRef.current;

      if (page && content) {
        content.style.transform = "none";
        page.style.height = "auto";
        page.style.overflow = "visible";
      }
    },
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
          <div ref={invoiceRef} className="invoice-print-wrapper invoice-page">
            <div ref={contentRef} className="invoice-scale-content">
              <Invoice order={order} />
            </div>
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
