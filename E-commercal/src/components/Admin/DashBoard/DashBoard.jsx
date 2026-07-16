import "./DashBoard.css";

import Topbar from "./Sections/Topbar/Topbar";
import StatsCards from "./Sections/StatsCards/StatsCards";
import SalesChart from "./Sections/SalesChart/SalesChart";
import RecentOrders from "./Sections/RecentOrders/RecentOrders";
import TopProducts from "./Sections/TopProducts/TopProducts";
import IncomeExpenses from "./Sections/IncomeExpenses/IncomeExpenses";
import DebtsOverview from "./Sections/DebtsOverview/DebtsOverview";
import LowStock from "./Sections/LowStock/LowStock";
import RecentCustomers from "./Sections/RecentCustomers/RecentCustomers";
import ProfitCard from "./Sections/ProfitCard/ProfitCard";
import QuickActions from "./Sections/QuickActions/QuickActions";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Topbar />

      <StatsCards />

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

        <div className="income-area">
          <IncomeExpenses />
        </div>

        <div className="debts-area">
          <DebtsOverview />
        </div>

        <div className="low-stock-area">
          <LowStock />
        </div>

        <div className="customers-area">
          <RecentCustomers />
        </div>

        <div className="profit-area">
          <ProfitCard />
        </div>
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;
