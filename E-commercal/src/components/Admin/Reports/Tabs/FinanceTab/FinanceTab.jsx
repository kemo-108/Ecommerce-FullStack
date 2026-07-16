import "./FinanceTab.css";

import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";

import {
  FiDollarSign,
  FiTrendingDown,
  FiTrendingUp,
  FiRotateCcw,
} from "react-icons/fi";
import AnalyticsChart from "../../Components/AnalyticsChart/AnalyticsChart";
import AnalyticsTable from "../../Components/AnalyticsTable/AnalyticsTable";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

import {
  financeOverviewData,
  expenseDistributionData,
  financialTransactions,
} from "../../Mock/reportsData";
const COLORS = ["#3B82F6", "#EF4444", "#22C55E", "#F59E0B"];
const FinanceTab = () => {
  return (
    <div className="finance-tab">
      {/* ================= Stats ================= */}

      <div className="finance-stats">
        <AnalyticsCard
          title="Revenue"
          value="$84,250"
          subtitle="+14.2% this month"
          icon={FiDollarSign}
          color="#22C55E"
        />

        <AnalyticsCard
          title="Expenses"
          value="$31,420"
          subtitle="Operating expenses"
          icon={FiTrendingDown}
          color="#EF4444"
        />

        <AnalyticsCard
          title="Net Profit"
          value="$52,830"
          subtitle="After all expenses"
          icon={FiTrendingUp}
          color="#3B82F6"
        />

        <AnalyticsCard
          title="Refunds"
          value="$1,280"
          subtitle="Refunded orders"
          icon={FiRotateCcw}
          color="#F59E0B"
        />
      </div>
      <div className="finance-charts">
        <AnalyticsChart title="Revenue vs Expenses">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={financeOverviewData}>
              <defs>
                <linearGradient id="financeRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="financeExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
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
                dataKey="revenue"
                stroke="#3B82F6"
                fill="url(#financeRevenue)"
                strokeWidth={3}
                animationDuration={1200}
              />

              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                fill="url(#financeExpense)"
                strokeWidth={3}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="Expense Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={expenseDistributionData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                animationDuration={1200}
              >
                {expenseDistributionData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
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
      </div>
      <div className="finance-table">
        <AnalyticsTable
          title="Financial Transactions"
          columns={["Transaction", "Type", "Amount", "Status"]}
          data={financialTransactions}
          renderRow={(item) => (
            <tr key={item.id}>
              <td>
                <div className="product-info">
                  <img src={item.image} alt={item.name} />

                  <span>{item.name}</span>
                </div>
              </td>

              <td>
                <span className="category-badge">{item.type}</span>
              </td>

              <td className="revenue">{item.amount}</td>

              <td>{item.status}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default FinanceTab;
