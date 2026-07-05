import "./ReportsContent.css";

import SalesTab from "../../Tabs/SalesTab/SalesTab";
import ProductsTab from "../../Tabs/ProductsTab/ProductsTab";
import CustomersTab from "../../Tabs/CustomersTab/CustomersTab";
import FinanceTab from "../../Tabs/FinanceTab/FinanceTab";
import InventoryTab from "../../Tabs/InventoryTab/InventoryTab";
import CouponsTab from "../../Tabs/CouponsTab/CouponsTab";
import ReviewsTab from "../../Tabs/ReviewsTab/ReviewsTab";

const ReportsContent = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductsTab />;

      case "customers":
        return <CustomersTab />;

      case "finance":
        return <FinanceTab />;

      case "inventory":
        return <InventoryTab />;

      case "coupons":
        return <CouponsTab />;

      case "reviews":
        return <ReviewsTab />;

      case "sales":
      default:
        return <SalesTab />;
    }
  };

  return <div className="reports-content">{renderContent()}</div>;
};

export default ReportsContent;
