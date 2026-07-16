import "./CouponsTab.css";

import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";
import AnalyticsChart from "../../Components/AnalyticsChart/AnalyticsChart";
import AnalyticsTable from "../../Components/AnalyticsTable/AnalyticsTable";

import { FiTag, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

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
  couponUsageData,
  couponStatusData,
  topCoupons,
} from "../../Mock/reportsData";

const COLORS = ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444"];

const CouponsTab = () => {
  return (
    <div className="coupons-tab">
      {/* ================= Stats ================= */}

      <div className="coupons-stats">
        <AnalyticsCard
          title="Total Coupons"
          value="58"
          subtitle="Created coupons"
          icon={FiTag}
          color="#3B82F6"
        />

        <AnalyticsCard
          title="Active"
          value="34"
          subtitle="Currently active"
          icon={FiCheckCircle}
          color="#22C55E"
        />

        <AnalyticsCard
          title="Expiring Soon"
          value="9"
          subtitle="Within 7 days"
          icon={FiClock}
          color="#F59E0B"
        />

        <AnalyticsCard
          title="Expired"
          value="15"
          subtitle="No longer valid"
          icon={FiXCircle}
          color="#EF4444"
        />
      </div>

      {/* ================= Charts ================= */}

      <div className="coupons-charts">
        <AnalyticsChart title="Coupon Usage">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={couponUsageData}>
              <defs>
                <linearGradient id="couponGradient" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="used"
                stroke="#3B82F6"
                fill="url(#couponGradient)"
                strokeWidth={3}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="Coupon Status">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={couponStatusData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                animationDuration={1200}
              >
                {couponStatusData.map((item, index) => (
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

      {/* ================= Table ================= */}

      <AnalyticsTable
        title="Top Coupons"
        columns={["Coupon", "Discount", "Used", "Status"]}
        data={topCoupons}
        renderRow={(item) => (
          <tr key={item.id}>
            <td>{item.code}</td>

            <td>{item.discount}</td>

            <td>{item.used}</td>

            <td>
              <span className="category-badge">{item.status}</span>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default CouponsTab;
