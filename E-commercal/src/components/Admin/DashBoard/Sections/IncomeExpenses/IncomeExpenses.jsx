import "./IncomeExpenses.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const IncomeExpenses = () => {
  const data = [
    { name: "Income", value: 18250 },
    { name: "Expenses", value: 11710 },
  ];

  const COLORS = ["#ff4d8d", "#4f8cff"];

  return (
    <div className="income-card">
      <div className="income-header">
        <h3>Income vs Expenses</h3>

        <select>
          <option>This Month</option>
          <option>This Week</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="pie-wrapper">
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

      <div className="income-info">
        <div className="income-item">
          <div className="income-left">
            <span className="income-dot income-color"></span>
            <p>Income</p>
          </div>

          <strong>$18,250</strong>
        </div>

        <div className="income-item">
          <div className="income-left">
            <span className="income-dot expense-color"></span>
            <p>Expenses</p>
          </div>

          <strong>$11,710</strong>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
