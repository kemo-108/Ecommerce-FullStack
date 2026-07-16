import "./ProfitCard.css";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const data = [
  { value: 10 },
  { value: 20 },
  { value: 18 },
  { value: 35 },
  { value: 28 },
  { value: 42 },
  { value: 40 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
];

const ProfitCard = () => {
  return (
    <div className="profit-card">
      <div className="profit-header">
        <h3>Net Profit</h3>

        <select>
          <option>This Month</option>
          <option>This Week</option>
          <option>This Year</option>
        </select>
      </div>

      <h2>$6,540</h2>

      <span className="profit-growth">+10.2%</span>

      <p>vs last month</p>

      <div className="profit-chart">
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="profit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff4d8d" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ff4d8d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="value"
              stroke="#ff4d8d"
              fill="url(#profit)"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitCard;
