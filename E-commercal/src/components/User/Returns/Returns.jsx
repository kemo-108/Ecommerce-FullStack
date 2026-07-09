import "./Returns.css";

import ReturnsHeader from "./Sections/ReturnsHeader/ReturnsHeader";
import ReturnsFilters from "./Sections/ReturnsFilters/ReturnsFilters";
import ReturnsTable from "./Sections/ReturnsTable/ReturnsTable";
import ReturnsPagination from "./Sections/ReturnsPagination/ReturnsPagination";

const Returns = () => {
  return (
    <div className="returns-page">
      <ReturnsHeader />

      <ReturnsFilters />

      <ReturnsTable />

      <ReturnsPagination />
    </div>
  );
};

export default Returns;
