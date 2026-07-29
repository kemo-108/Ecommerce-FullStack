import "./SalesTab.css";
import { useEffect, useState } from "react";

import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";
import AnalyticsChart from "../../Components/AnalyticsChart/AnalyticsChart";
import AnalyticsTable from "../../Components/AnalyticsTable/AnalyticsTable";

import {
  FiDollarSign,
  FiShoppingBag,
  FiTrendingUp,
  FiCreditCard,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { GetSalesReport } from "../../../../../services/ReportsService";
import { formatCurrency } from "../../Utils/reportHelpers";

const COLORS = ["#FF4D8D", "#3B82F6", "#22C55E", "#F59E0B"];

const signedPercent = (value) => ` ${value > 0 ? "+" : ""} ${value}%`;

const SalesTab = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await GetSalesReport();
        setReport(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="sales-tab">Loading sales report...</div>;
  if (!report)
    return <div className="sales-tab">Couldn't load the sales report.</div>;

  const revenueByMonth = report.revenueByMonth.map((m) => ({
    month: m.month,
    revenue: m.value,
  }));
  const ordersByMonth = report.ordersByMonth.map((m) => ({
    month: m.month,
    orders: m.value,
  }));
  const profitByMonth = report.profitByMonth.map((m) => ({
    month: m.month,
    profit: m.value,
  }));
  const paymentData = report.paymentMethods.map((p) => ({
    name: p.name,
    value: p.value,
  }));

  return (
    <div className="sales-tab">
      {/* ================= Stats ================= */}

      <div className="sales-stats">
        <AnalyticsCard
          title="Revenue"
          value={formatCurrency(report.revenue)}
          subtitle={` ${signedPercent(report.revenueChangePercent)} than last month`}
          icon={FiDollarSign}
          color="#22C55E"
        />

        <AnalyticsCard
          title="Orders"
          value={report.totalOrders.toLocaleString()}
          subtitle={` ${report.newOrdersToday} new today`}
          icon={FiShoppingBag}
          color="#3B82F6"
        />

        <AnalyticsCard
          title="Profit"
          value={formatCurrency(report.profit)}
          subtitle={` ${signedPercent(report.profitChangePercent)} growth`}
          icon={FiTrendingUp}
          color="#FF4D8D"
        />

        <AnalyticsCard
          title="Average Order"
          value={formatCurrency(report.averageOrderValue)}
          subtitle="This month"
          icon={FiCreditCard}
          color="#F59E0B"
        />
      </div>

      {/* ================= Charts ================= */}

      <div className="sales-charts">
        <AnalyticsChart title="Revenue Overview">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueByMonth}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4d8d" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#ff4d8d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#f2f2f2"
              />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <YAxis tickLine={false} axisLine={false} />

              <Tooltip
                cursor={{
                  stroke: "#ff4d8d",
                  strokeDasharray: "5 5",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ff4d8d"
                strokeWidth={3}
                fill="url(#colorRevenue)"
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="Orders By Month">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={ordersByMonth}>
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#f2f2f2"
              />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <YAxis tickLine={false} axisLine={false} />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Bar
                dataKey="orders"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
                barSize={28}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsChart>
      </div>
      {/* ================= Bottom Charts ================= */}

      <div className="sales-bottom">
        <AnalyticsChart title="Payment Methods">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                animationDuration={1200}
              >
                {paymentData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Legend verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="Monthly Profit">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={profitByMonth}>
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#f2f2f2"
              />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <YAxis tickLine={false} axisLine={false} />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Area
                type="monotone"
                dataKey="profit"
                stroke="#22C55E"
                strokeWidth={3}
                fill="url(#profitGradient)"
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsChart>
      </div>

      {/* ================= Table ================= */}

      <AnalyticsTable
        title="Top Selling Products"
        columns={["Product", "Category", "Sold", "Revenue"]}
        data={report.topProducts}
        renderRow={(item) => (
          <tr key={item.productId}>
            <td>
              <div className="product-info">
                <img
                  src={item.image || "https://placehold.co/60x60"}
                  alt={item.name}
                />

                <span>{item.name}</span>
              </div>
            </td>

            <td>
              <span className="category-badge">{item.category}</span>
            </td>

            <td>{item.sold}</td>

            <td className="revenue">{formatCurrency(item.revenue)}</td>
          </tr>
        )}
      />
    </div>
  );
};

export default SalesTab;
