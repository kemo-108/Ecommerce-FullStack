import { useEffect, useState } from "react";
import "./Accounting.css";

import {
  FaDollarSign,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaChartLine,
  FaTrash,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { GetLedgerSummary } from "../../../services/ReportsService";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../../../services/ExpensesService";

const EXPENSE_TYPES = ["Rent", "Utilities", "Salaries", "Marketing", "Supplies", "Other"];
const CHANNELS = ["Shared", "Online", "InStore"];

const DATE_PRESETS = [
  { key: "all", label: "All Time" },
  { key: "month", label: "This Month" },
  { key: "last30", label: "Last 30 Days" },
];

const money = (n) =>
  Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });

const presetToRange = (preset) => {
  const now = new Date();
  if (preset === "month") {
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: from.toISOString().slice(0, 10), to: null };
  }
  if (preset === "last30") {
    const from = new Date(now);
    from.setDate(from.getDate() - 30);
    return { from: from.toISOString().slice(0, 10), to: null };
  }
  return { from: null, to: null };
};

const Accounting = () => {
  const [ledger, setLedger] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingExpense, setSavingExpense] = useState(false);
  const [datePreset, setDatePreset] = useState("all");

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    type: "Rent",
    channel: "Shared",
    amount: "",
    notes: "",
  });

  const loadAll = async (preset = datePreset) => {
    setLoading(true);
    try {
      const { from, to } = presetToRange(preset);
      const [ledgerData, expensesData] = await Promise.all([
        GetLedgerSummary(from, to),
        getExpenses(),
      ]);
      setLedger(ledgerData);
      setExpenses(expensesData);
    } catch (err) {
      console.error("Failed to load accounting data", err);
    } finally {
      setLoading(false);
    }
  };

  // Single fetch on mount — every sub-section here reads from the same
  // two state values above rather than each fetching independently, which
  // is exactly the pattern that caused the inventory-page flicker bug.
  useEffect(() => {
    loadAll(datePreset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datePreset]);

  const handleDatePresetChange = (preset) => {
    setDatePreset(preset);
  };

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return;

    setSavingExpense(true);
    try {
      await createExpense({
        date: form.date,
        type: form.type,
        channel: form.channel,
        amount: Number(form.amount),
        notes: form.notes,
      });
      setForm((prev) => ({ ...prev, amount: "", notes: "" }));
      await loadAll();
    } catch (err) {
      console.error("Failed to add expense", err);
    } finally {
      setSavingExpense(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      await loadAll();
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  if (loading) {
    return <div className="accounting-page acc-loading">Loading ledger…</div>;
  }

  if (!ledger) {
    return <div className="accounting-page acc-loading">Couldn't load the ledger.</div>;
  }

  const netPositive = ledger.netProfit >= 0;

  return (
    <div className="accounting-page">
      <div className="acc-header">
        <h1>Accounting</h1>
        <p>Live profit &amp; loss — computed from real orders, product costs, and logged expenses.</p>
      </div>

      <div className="acc-date-presets">
        {DATE_PRESETS.map((p) => (
          <button
            key={p.key}
            className={`acc-preset-btn ${datePreset === p.key ? "active" : ""}`}
            onClick={() => handleDatePresetChange(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="acc-kpis">
        <div className="acc-kpi-card">
          <div className="acc-kpi-icon" style={{ background: "#E9F8EE" }}>
            <FaDollarSign />
          </div>
          <div>
            <h5>Total Revenue</h5>
            <h2>{money(ledger.totalRevenue)}</h2>
          </div>
        </div>

        <div className="acc-kpi-card">
          <div className="acc-kpi-icon" style={{ background: "#FFF6DD" }}>
            <FaBoxOpen />
          </div>
          <div>
            <h5>Cost of Goods Sold</h5>
            <h2>{money(ledger.totalCost)}</h2>
          </div>
        </div>

        <div className="acc-kpi-card">
          <div className="acc-kpi-icon" style={{ background: "#FFEAF2" }}>
            <FaFileInvoiceDollar />
          </div>
          <div>
            <h5>Total Expenses</h5>
            <h2>{money(ledger.totalExpenses)}</h2>
          </div>
        </div>

        <div className="acc-kpi-card">
          <div className="acc-kpi-icon" style={{ background: "#E8F1FF" }}>
            <FaChartLine />
          </div>
          <div>
            <h5>Avg. Margin</h5>
            <h2>{ledger.averageMarginPercent}%</h2>
          </div>
        </div>
      </div>

      <div className="acc-stamp-area">
        <div className={`acc-stamp ${netPositive ? "pos" : "neg"}`}>
          <span className="acc-stamp-word">
            {netPositive ? "Net Profit" : "Net Loss"}
          </span>
          <span className="acc-stamp-num">{money(Math.abs(ledger.netProfit))}</span>
        </div>
        <div className="acc-stamp-text">
          <h3>Break-even revenue</h3>
          <p>
            {ledger.breakEvenRevenue !== null
              ? `You need about ${money(ledger.breakEvenRevenue)} in sales to cover your logged expenses, based on your current ${ledger.averageMarginPercent}% average margin.`
              : "Not enough sales data yet to estimate a break-even point."}
          </p>
        </div>
      </div>

      <div className="acc-section-title">Net Profit — Last 6 Months</div>
      <div className="acc-chart-card">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={ledger.netProfitByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => money(value)} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff4d6d"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="acc-section-title">Breakdown</div>
      <div className="acc-grid-2">
        <div className="acc-breakdown-card">
          <h4>Profit by Category</h4>
          {ledger.byCategory.length === 0 && <p className="acc-empty-note">No sales yet.</p>}
          {ledger.byCategory.map((c) => (
            <div className="acc-bd-row" key={c.name}>
              <span>{c.name}</span>
              <span className={c.profit >= 0 ? "acc-pos" : "acc-neg"}>{money(c.profit)}</span>
            </div>
          ))}
        </div>

        <div className="acc-breakdown-card">
          <h4>Profit by Channel</h4>
          {ledger.byChannel.map((c) => (
            <div className="acc-bd-row" key={c.name}>
              <span>{c.name === "InStore" ? "In-Store" : "Online"}</span>
              <span className={c.profit >= 0 ? "acc-pos" : "acc-neg"}>{money(c.profit)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="acc-section-title">Dead Stock (no sale in 30+ days)</div>
      {ledger.deadStock.length === 0 ? (
        <div className="acc-alert acc-alert-empty">Nothing sitting idle right now 👍</div>
      ) : (
        ledger.deadStock.map((p) => (
          <div className="acc-alert" key={p.productId}>
            <span>{p.productName} — {p.stock} left in stock</span>
            <span>{p.category}{p.lastSoldDate ? ` · last sold ${p.lastSoldDate}` : " · never sold"}</span>
          </div>
        ))
      )}

      <div className="acc-section-title">Expenses</div>
      <form className="acc-expense-form" onSubmit={handleAddExpense}>
        <div className="acc-field">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleFormChange} />
        </div>
        <div className="acc-field">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleFormChange}>
            {EXPENSE_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="acc-field">
          <label>Channel</label>
          <select name="channel" value={form.channel} onChange={handleFormChange}>
            {CHANNELS.map((c) => (
              <option key={c} value={c}>{c === "InStore" ? "In-Store" : c}</option>
            ))}
          </select>
        </div>
        <div className="acc-field">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={form.amount}
            onChange={handleFormChange}
            placeholder="0.00"
          />
        </div>
        <div className="acc-field acc-field-notes">
          <label>Notes (optional)</label>
          <input type="text" name="notes" value={form.notes} onChange={handleFormChange} />
        </div>
        <button className="acc-btn" type="submit" disabled={savingExpense}>
          {savingExpense ? "Saving…" : "Add Expense"}
        </button>
      </form>

      <div className="acc-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Channel</th>
              <th>Amount</th>
              <th>Notes</th>
              <th>Logged by</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="7" className="acc-empty-note">No expenses logged yet.</td>
              </tr>
            ) : (
              expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.type}</td>
                  <td>{e.channel === "InStore" ? "In-Store" : e.channel}</td>
                  <td>{money(e.amount)}</td>
                  <td>{e.notes || "—"}</td>
                  <td>{e.createdByName}</td>
                  <td>
                    <button className="acc-btn-danger" onClick={() => handleDeleteExpense(e.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accounting;
