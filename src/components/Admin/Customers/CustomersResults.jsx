import "./CustomersResults.css";

const CustomersResults = ({ filteredCount, totalCount }) => {
  return (
    <div className="customers-results">
      <p>
        Showing
        <span> {filteredCount} </span>
        of
        <span> {totalCount} </span>
        Customers
      </p>
    </div>
  );
};

export default CustomersResults;
