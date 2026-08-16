import "./Invoice.css";

const Invoice = ({ order }) => {
  if (!order) return null;

  return (
    <div className="invoice-sheet">
      {/* ================= Header ================= */}
      <div className="invoice-header">
        <div className="invoice-company">
          <h1>مكتبة الاصدقاء</h1>

          <p>Premium Art & Home Decoration</p>

          <span>www.مكتبة الاصدقاء.com</span>
        </div>

        <div className="invoice-meta">
          <h2>INVOICE</h2>

          <div className="meta-row">
            <span>Invoice No</span>
            <strong>INV-{order.orderId}</strong>
          </div>

          <div className="meta-row">
            <span>Order ID</span>
            <strong>#{order.orderId}</strong>
          </div>

          <div className="meta-row">
            <span>Date</span>
            <strong>{order.orderDate}</strong>
          </div>
        </div>
      </div>
      {/* ================= Customer ================= */}
      <div className="invoice-info-grid">
        <div className="info-card">
          <h3>Store Information</h3>

          <div className="info-row">
            <span>Store</span>
            <strong>مكتبة الاصدقاء</strong>
          </div>

          <div className="info-row">
            <span>Phone</span>
            <strong>01014884658</strong>
          </div>

          <div className="info-row">
            <span>Email</span>
            <strong>support@مكتبة الاصدقاء.com</strong>
          </div>

          <div className="info-row">
            <span>Address</span>
            <strong>El Mokattam - Cairo</strong>
          </div>
        </div>

        <div className="info-card">
          <h3>Customer Information</h3>

          <div className="info-row">
            <span>Name</span>
            <strong>{order.customerName}</strong>
          </div>

          <div className="info-row">
            <span>Email</span>
            <strong>{order.customerEmail}</strong>
          </div>

          <div className="info-row">
            <span>Status</span>
            <strong>{order.status}</strong>
          </div>

          <div className="info-row">
            <span>Payment</span>
            <strong>{order.paymentStatus}</strong>
          </div>

          <div className="info-row">
            <span>Shipping Address</span>
            <strong>{order.address || "—"}</strong>
          </div>
        </div>
      </div>
      {/* ================= Products ================= */}
      <div className="invoice-products">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {(order.items || []).map((item, index) => (
              <tr key={`${item.productId ?? "item"}-${index}`}>
                <td>{index + 1}</td>

                <td className="product-name">
                  {item.productName}
                  {item.colorName && (
                    <span className="invoice-item-color">
                      {" "}
                      — {item.colorName}
                    </span>
                  )}
                  {item.sizeName && (
                    <span className="invoice-item-color">
                      {" "}
                      — {item.sizeName}
                    </span>
                  )}
                </td>

                <td>{item.quantity}</td>

                <td> ${Number(item.price).toFixed(2)}</td>

                <td>
                  {" "}
                  ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ================= Summary ================= */}
      <div className="invoice-summary">
        <div className="payment-card">
          <h3>Payment Information</h3>

          <div className="summary-row">
            <span>Payment Method</span>
            <strong>{order.paymentMethod || "—"}</strong>
          </div>

          <div className="summary-row">
            <span>Payment Status</span>
            <strong>{order.paymentStatus}</strong>
          </div>

          <div className="summary-row">
            <span>Order Status</span>
            <strong>{order.status}</strong>
          </div>
        </div>

        <div className="total-card">
          <div className="total-row">
            <span>Subtotal</span>
            <strong> ${Number(order.subtotal).toFixed(2)}</strong>
          </div>

          <div className="total-row">
            <span>Shipping</span>
            <strong> ${Number(order.shipping).toFixed(2)}</strong>
          </div>

          <div className="total-row">
            <span>Discount</span>
            <strong>- ${Number(order.discount || 0).toFixed(2)}</strong>
          </div>

          <div className="total-row">
            <span>Tax</span>
            <strong> ${Number(order.tax).toFixed(2)}</strong>
          </div>

          <div className="grand-total">
            <span>Grand Total</span>
            <strong> ${Number(order.total).toFixed(2)}</strong>
          </div>
        </div>
      </div>
      {/* ================= Footer ================= */}
      <div className="invoice-footer">
        <div className="invoice-notes">
          <h3>Notes</h3>

          <p>
            • Products can be returned within 14 days from the purchase date.
          </p>

          <p>• Please keep this invoice as proof of purchase.</p>

          <p>• For any questions please contact مكتبة الاصدقاء support.</p>
        </div>

        <div className="invoice-contact">
          <h2>مكتبة الاصدقاء</h2>

          <span>Thank you for choosing us ❤️</span>

          <div className="contact-row">
            <strong>Phone</strong>
            <p>01014884658</p>
          </div>

          <div className="contact-row">
            <strong>Email</strong>
            <p>support@مكتبة الاصدقاء.com</p>
          </div>

          <div className="contact-row">
            <strong>Address</strong>
            <p>El Mokattam - Cairo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
