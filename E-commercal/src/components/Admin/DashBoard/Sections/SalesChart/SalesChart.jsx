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

const data = [
  { day: "01", revenue: 2000, orders: 4500 },
  { day: "04", revenue: 4000, orders: 6700 },
  { day: "07", revenue: 3200, orders: 3100 },
  { day: "10", revenue: 6800, orders: 4700 },
  { day: "13", revenue: 2900, orders: 7600 },
  { day: "16", revenue: 4100, orders: 5800 },
  { day: "19", revenue: 5200, orders: 3000 },
  { day: "22", revenue: 8400, orders: 5200 },
  { day: "25", revenue: 6100, orders: 4700 },
  { day: "28", revenue: 4800, orders: 2100 },
  { day: "31", revenue: 7200, orders: 3500 },
];

const SalesChart = () => {
  return (
    <div className="sales-chart-card">
      <div className="sales-chart-header">
        <h3>Sales Overview</h3>

        <select>
          <option>This Month</option>
          <option>This Week</option>
          <option>This Year</option>
        </select>
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

            <XAxis dataKey="day" tickLine={false} axisLine={false} />

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
