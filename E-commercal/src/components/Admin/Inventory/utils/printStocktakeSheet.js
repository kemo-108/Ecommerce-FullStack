// Builds a printable physical stocktake ("جرد") sheet from the inventory
// list currently shown on screen (so it respects whatever warehouse/
// category filter is active - e.g. counting just one warehouse at a time).
// Opens a plain, print-friendly window rather than trying to reuse the
// app's own screen styles, since a receipt/paper sheet has very different
// needs (black & white, no shadows/rounded cards, page-break friendly).

export function printStocktakeSheet(products) {
  const printDate = new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const rows = products
    .map(
      (p, index) => `
        <tr>
          <td>${index + 1}</td>
          <td class="right">${escapeHtml(p.name || "")}</td>
          <td>${escapeHtml(p.sku || "—")}</td>
          <td>${escapeHtml(p.category || "—")}</td>
          <td>${escapeHtml(p.warehouse || "—")}</td>
          <td>${p.stock ?? "—"}</td>
          <td class="blank-cell"></td>
          <td class="blank-cell"></td>
          <td class="blank-cell notes-cell"></td>
        </tr>`
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>كشف جرد المخزون</title>
      <style>
        @page { size: A4; margin: 14mm; }
        * { box-sizing: border-box; }
        body {
          font-family: Tahoma, Arial, sans-serif;
          color: #111;
          margin: 0;
          padding: 0;
        }
        .sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 2px solid #111;
          padding-bottom: 10px;
          margin-bottom: 16px;
        }
        .sheet-header h1 {
          margin: 0 0 4px;
          font-size: 20px;
        }
        .sheet-header .meta {
          font-size: 12px;
          color: #444;
        }
        .fill-line {
          display: inline-block;
          min-width: 140px;
          border-bottom: 1px solid #111;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11.5px;
        }
        th, td {
          border: 1px solid #999;
          padding: 6px 6px;
          text-align: center;
        }
        th {
          background: #eee;
          font-size: 11px;
        }
        td.right { text-align: right; }
        .blank-cell { min-width: 46px; }
        .notes-cell { min-width: 80px; }
        tfoot td {
          border: none;
          padding-top: 26px;
          font-size: 12.5px;
        }
        .signatures {
          display: flex;
          justify-content: space-between;
          margin-top: 34px;
        }
        .signatures div { font-size: 12.5px; }
        .signatures .line {
          display: inline-block;
          min-width: 160px;
          border-bottom: 1px solid #111;
          margin-right: 8px;
        }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="sheet-header">
        <div>
          <h1>كشف جرد المخزون</h1>
          <div class="meta">التاريخ: ${printDate} &nbsp;&nbsp;|&nbsp;&nbsp; عدد الأصناف: ${products.length}</div>
        </div>
        <div class="meta">
          القائم بالجرد: <span class="fill-line">&nbsp;</span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>المنتج</th>
            <th>SKU</th>
            <th>القسم</th>
            <th>المخزن</th>
            <th>الرصيد بالنظام</th>
            <th>الكمية الفعلية</th>
            <th>الفرق</th>
            <th>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="signatures">
        <div>توقيع القائم بالجرد: <span class="line">&nbsp;</span></div>
        <div>توقيع المسؤول: <span class="line">&nbsp;</span></div>
      </div>
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank", "width=900,height=1000");
  if (!printWindow) {
    // Popup blocked - nothing we can silently recover from here.
    alert("المتصفح منع فتح نافذة الطباعة. من فضلك اسمح بالنوافذ المنبثقة لهذا الموقع وجرب تاني.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  // Give the new document a moment to finish laying out before printing.
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
