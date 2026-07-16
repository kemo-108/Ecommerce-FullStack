import "./ProductsTab.css";

import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";
import AnalyticsChart from "../../Components/AnalyticsChart/AnalyticsChart";
import AnalyticsTable from "../../Components/AnalyticsTable/AnalyticsTable";

import {
  FiPackage,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import {
  categorySalesData,
  categoryDistributionData,
  bestSellingProducts,
  leastSellingProducts,
} from "../../Mock/reportsData";

const COLORS = ["#FF4D8D", "#3B82F6", "#22C55E", "#F59E0B", "#A855F7"];

const ProductsTab = () => {
  return (
    <div className="products-tab">
      {/* ================= Stats ================= */}

      <div className="products-stats">
        <AnalyticsCard
          title="Total Products"
          value="248"
          subtitle="Across all categories"
          icon={FiPackage}
          color="#3B82F6"
        />

        <AnalyticsCard
          title="Active Products"
          value="224"
          subtitle="Available for sale"
          icon={FiCheckCircle}
          color="#22C55E"
        />

        <AnalyticsCard
          title="Low Stock"
          value="18"
          subtitle="Need restocking"
          icon={FiAlertTriangle}
          color="#F59E0B"
        />

        <AnalyticsCard
          title="Out of Stock"
          value="6"
          subtitle="Currently unavailable"
          icon={FiXCircle}
          color="#EF4444"
        />
      </div>

      {/* ================= Charts ================= */}

      <div className="products-charts">
        <AnalyticsChart title="Top Selling Categories">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categorySalesData}>
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#f2f2f2"
              />

              <XAxis dataKey="category" tickLine={false} axisLine={false} />

              <YAxis tickLine={false} axisLine={false} />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
              />

              <Bar
                dataKey="sales"
                fill="#FF4D8D"
                radius={[8, 8, 0, 0]}
                barSize={35}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="Category Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryDistributionData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                animationDuration={1200}
              >
                {categoryDistributionData.map((entry, index) => (
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
      {/* ================= Tables ================= */}

      <div className="products-tables">
        <AnalyticsTable
          title="Best Selling Products"
          columns={["Product", "Category", "Sold", "Revenue"]}
          data={bestSellingProducts}
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

        <AnalyticsTable
          title="Least Selling Products"
          columns={["Product", "Category", "Sold", "Revenue"]}
          data={leastSellingProducts}
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

export default ProductsTab;
