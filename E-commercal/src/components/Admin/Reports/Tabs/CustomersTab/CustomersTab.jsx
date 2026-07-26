import "./CustomersTab.css";
import { useEffect, useState } from "react";

import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";

import { FiUsers, FiUserPlus, FiRefreshCw, FiUserCheck } from "react-icons/fi";
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

import { GetCustomersReport } from "../../../../../services/ReportsService";
import { formatCurrency } from "../../Utils/reportHelpers";

const CustomersTab = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await GetCustomersReport();
        setReport(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="customers-tab">Loading customers report...</div>;
  if (!report) return <div className="customers-tab">Couldn't load the customers report.</div>;

  const customerGrowthData = report.customerGrowth.map((m) => ({
    month: m.month,
    customers: m.value,
  }));
  const customerTypeData = report.customerTypeSplit.map((c) => ({
    name: c.name,
    value: c.value,
  }));

  return (
    <div className="customers-tab">
      <div className="customers-stats">
        <AnalyticsCard
          title="Total Customers"
          value={report.totalCustomers.toLocaleString()}
          subtitle="Registered customers"
          icon={FiUsers}
          color="#3B82F6"
        />

        <AnalyticsCard
          title="New Customers"
          value={report.newCustomersThisMonth.toLocaleString()}
          subtitle="This month"
          icon={FiUserPlus}
          color="#22C55E"
        />

        <AnalyticsCard
          title="Returning"
          value={report.returningCustomers.toLocaleString()}
          subtitle="Repeat purchases"
          icon={FiRefreshCw}
          color="#F59E0B"
        />

        <AnalyticsCard
          title="Active Customers"
          value={report.activeCustomers.toLocaleString()}
          subtitle="Ordered in the last 90 days"
          icon={FiUserCheck}
          color="#FF4D8D"
        />
      </div>
      <div className="customers-charts">
        <AnalyticsChart title="Customer Growth">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={customerGrowthData}>
              <defs>
                <linearGradient
                  id="customerGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
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
                dataKey="customers"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#customerGradient)"
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="New vs Returning">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={customerTypeData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                animationDuration={1200}
              >
                {customerTypeData.map((entry, index) => (
                  <Cell key={index} fill={["#22C55E", "#FF4D8D"][index % 2]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </AnalyticsChart>
      </div>
      <div className="customers-tables">
        <AnalyticsTable
          title="Top Customers"
          columns={["Customer", "Email", "Orders", "Total Spent"]}
          data={report.topCustomers}
          renderRow={(item) => (
            <tr key={item.userId}>
              <td>
                <div className="product-info">
                  <img
                    src={item.image || "https://placehold.co/60x60"}
                    alt={item.name}
                  />
                  <span>{item.name}</span>
                </div>
              </td>

              <td>{item.email}</td>

              <td>{item.orders}</td>

              <td className="revenue">{formatCurrency(item.spent)}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default CustomersTab;