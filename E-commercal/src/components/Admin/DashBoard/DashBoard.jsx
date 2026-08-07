import "./DashBoard.css";

import Topbar from "./Sections/Topbar/Topbar";
import StatsCards from "./Sections/StatsCards/StatsCards";
import SalesChart from "./Sections/SalesChart/SalesChart";
import RecentOrders from "./Sections/RecentOrders/RecentOrders";
import TopProducts from "./Sections/TopProducts/TopProducts";
import LowStock from "./Sections/LowStock/LowStock";
import RecentCustomers from "./Sections/RecentCustomers/RecentCustomers";
import QuickActions from "./Sections/QuickActions/QuickActions";
import DebtsOverview from "./Sections/DebtsOverview/DebtsOverview";
import IncomingOrders from "./Sections/IncomeExpenses/IncomeExpenses";
import ProfitCard from "./Sections/ProfitCard/ProfitCard";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Topbar />

      <StatsCards />
      <IncomingOrders />
      <ProfitCard />
      <DebtsOverview />
      <div className="dashboard-grid">
        <div className="sales-chart-area">
          <SalesChart />
        </div>

        <div className="recent-orders-area">
          <RecentOrders />
        </div>

        <div className="top-products-area">
          <TopProducts />
        </div>

        <div className="low-stock-area">
          <LowStock />
        </div>

        <div className="customers-area">
          <RecentCustomers />
        </div>
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;
