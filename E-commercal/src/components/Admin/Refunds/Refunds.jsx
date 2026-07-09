import "./Refunds.css";

import RefundStats from "./Sections/RefundStats/RefundStats";
import RefundToolbar from "./Sections/RefundToolbar/RefundToolbar";
import RefundFilters from "./Sections/RefundFilters/RefundFilters";
import RefundTable from "./Sections/RefundTable/RefundTable";
import RefundPagination from "./Sections/RefundPagination/RefundPagination";

const Refunds = () => {
  return (
    <div className="refunds">
      <RefundStats />

      <RefundToolbar />

      <RefundFilters />

      <RefundTable />

      <RefundPagination />
    </div>
  );
};

export default Refunds;
