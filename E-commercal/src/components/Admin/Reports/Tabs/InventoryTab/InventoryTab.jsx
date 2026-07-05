import "./InventoryTab.css";

import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";

import {
  FiArchive,
  FiPackage,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";
const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];
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
  stockMovementData,
  stockStatusData,
  lowStockProducts,
} from "../../Mock/reportsData";
const InventoryTab = () => {
  return (
    <div className="inventory-tab">
      {/* ================= Stats ================= */}

      <div className="inventory-stats">
        <AnalyticsCard
          title="Inventory Value"
          value="$182,450"
          subtitle="Current stock value"
          icon={FiArchive}
          color="#3B82F6"
        />

        <AnalyticsCard
          title="In Stock"
          value="842"
          subtitle="Available items"
          icon={FiPackage}
          color="#22C55E"
        />

        <AnalyticsCard
          title="Low Stock"
          value="26"
          subtitle="Need restock"
          icon={FiAlertTriangle}
          color="#F59E0B"
        />

        <AnalyticsCard
          title="Out Of Stock"
          value="8"
          subtitle="Unavailable items"
          icon={FiXCircle}
          color="#EF4444"
        />
      </div>
      <div className="inventory-charts">
        <AnalyticsChart title="Stock Movement">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={stockMovementData}>
              <defs>
                <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="stock"
                stroke="#22C55E"
                strokeWidth={3}
                fill="url(#stockGradient)"
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="Stock Status">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={stockStatusData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                animationDuration={1200}
              >
                {stockStatusData.map((entry, index) => (
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
      <div className="inventory-table">
        <AnalyticsTable
          title="Low Stock Products"
          columns={["Product", "Category", "Sold", "Stock"]}
          data={lowStockProducts}
          renderRow={(item) => (
            <tr key={item.id}>
              <td>
                <div className="product-info">
                  <img src={item.image} alt={item.name} />

                  <span>{item.name}</span>
                </div>
              </td>

              <td>
                <span className="category-badge">{item.category}</span>
              </td>

              <td>{item.sold}</td>

              <td className="revenue">{item.revenue}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default InventoryTab;
