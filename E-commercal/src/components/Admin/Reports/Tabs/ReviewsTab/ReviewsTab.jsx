import "./ReviewsTab.css";

import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";
import AnalyticsChart from "../../Components/AnalyticsChart/AnalyticsChart";
import AnalyticsTable from "../../Components/AnalyticsTable/AnalyticsTable";

import {
  FiStar,
  FiMessageSquare,
  FiThumbsUp,
  FiAlertCircle,
} from "react-icons/fi";

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
  reviewTrendData,
  reviewRatingData,
  recentReviews,
} from "../../Mock/reportsData";

const COLORS = ["#F59E0B", "#22C55E", "#EF4444"];

const ReviewsTab = () => {
  return (
    <div className="reviews-tab">
      {/* ================= Stats ================= */}

      <div className="reviews-stats">
        <AnalyticsCard
          title="Total Reviews"
          value="1,248"
          subtitle="Customer reviews"
          icon={FiMessageSquare}
          color="#3B82F6"
        />

        <AnalyticsCard
          title="Average Rating"
          value="4.8"
          subtitle="Out of 5"
          icon={FiStar}
          color="#F59E0B"
        />

        <AnalyticsCard
          title="Positive"
          value="92%"
          subtitle="Satisfied customers"
          icon={FiThumbsUp}
          color="#22C55E"
        />

        <AnalyticsCard
          title="Negative"
          value="8%"
          subtitle="Need attention"
          icon={FiAlertCircle}
          color="#EF4444"
        />
      </div>

      {/* ================= Charts ================= */}

      <div className="reviews-charts">
        <AnalyticsChart title="Reviews Trend">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={reviewTrendData}>
              <defs>
                <linearGradient id="reviewGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
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
                dataKey="reviews"
                stroke="#F59E0B"
                fill="url(#reviewGradient)"
                strokeWidth={3}
                animationDuration={1200}
              />
            </AreaChart>
          </ResponsiveContainer>
        </AnalyticsChart>

        <AnalyticsChart title="Ratings">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={reviewRatingData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                animationDuration={1200}
              >
                {reviewRatingData.map((item, index) => (
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
        title="Latest Reviews"
        columns={["Customer", "Rating", "Product", "Status"]}
        data={recentReviews}
        renderRow={(item) => (
          <tr key={item.id}>
            <td>{item.customer}</td>

            <td>{item.rating}</td>

            <td>{item.product}</td>

            <td>
              <span className="category-badge">{item.status}</span>
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default ReviewsTab;
