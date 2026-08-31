import "./OrdersFilters.css";

const OrdersFilters = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedPayment,
  setSelectedPayment,
  selectedSource,
  setSelectedSource,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="orders-filters">
      <input
        type="text"
        placeholder="Search orders..."
        className="orders-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="orders-filter-select"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="All Status">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <select
        className="orders-filter-select"
        value={selectedPayment}
        onChange={(e) => setSelectedPayment(e.target.value)}
      >
        <option value="All Payment">All Payment</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
      </select>

      <select
        className="orders-filter-select"
        value={selectedSource}
        onChange={(e) => setSelectedSource(e.target.value)}
      >
        <option value="All Channels">All Channels</option>
        <option value="Online">Online</option>
        <option value="InStore">In-Store</option>
      </select>

      <select
        className="orders-filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="AmountHigh">Highest Amount</option>
        <option value="AmountLow">Lowest Amount</option>
      </select>
    </div>
  );
};

export default OrdersFilters;
