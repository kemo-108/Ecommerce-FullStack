import "./DebtsOverview.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Total Debts", value: 4350 },
  { name: "Paid", value: 2150 },
];

const COLORS = ["#ff4d8d", "#4ade80"];

const DebtsOverview = () => {
  return (
    <div className="debts-card">
      <div className="debts-header">
        <h3>Debts Overview</h3>

        <select>
          <option>This Month</option>
          <option>This Week</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="debts-pie">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="debts-info">
        <div className="debts-item">
          <div className="debts-left">
            <span className="dot total"></span>
            <p>Total Debts</p>
          </div>

          <strong>$4,350</strong>
        </div>

        <div className="debts-item">
          <div className="debts-left">
            <span className="dot paid"></span>
            <p>Paid</p>
          </div>

          <strong>$2,150</strong>
        </div>
      </div>
    </div>
  );
};

export default DebtsOverview;
