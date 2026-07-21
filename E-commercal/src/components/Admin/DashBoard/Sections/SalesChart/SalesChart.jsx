import { useEffect, useState } from "react";
import "./SalesChart.css";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { GetDashboardStats } from "../../../../../services/DashboardService";

const SalesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetDashboardStats()
      .then((stats) => {
        setData(
          (stats.revenueByMonth || []).map((m) => ({
            month: m.month,
            revenue: m.revenue,
            orders: m.orders,
          }))
        );
      })
      .catch(() => {});
  }, []);

  return (
    <div className="sales-chart-card">
      <div className="sales-chart-header">
        <h3>Sales Overview</h3>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4d8d" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ff4d8d" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f8cff" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#4f8cff" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#f1f1f1" />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,.1)",
              }}
            />

            <Legend iconType="circle" verticalAlign="top" align="right" />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#ff4d8d"
              fill="url(#revenueGradient)"
              strokeWidth={3}
              fillOpacity={1}
              dot={false}
              activeDot={{ r: 6 }}
            />

            <Area
              type="monotone"
              dataKey="orders"
              stroke="#4f8cff"
              fill="url(#ordersGradient)"
              strokeWidth={3}
              fillOpacity={1}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
