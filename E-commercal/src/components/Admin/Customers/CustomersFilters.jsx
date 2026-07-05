import "./CustomersFilters.css";

const CustomersFilters = ({
  customers,
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy,
}) => {
  const customerTypes = [...new Set(customers.map((c) => c.type))];

  return (
    <div className="customers-filters">
      <input
        type="text"
        className="search-input"
        placeholder="Search customer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="filter-select"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="All Status">All Status</option>

        <option value="Active">Active</option>

        <option value="Blocked">Blocked</option>
      </select>

      <select
        className="filter-select"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="All Types">All Types</option>

        {customerTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="Newest">Newest</option>

        <option value="Oldest">Oldest</option>

        <option value="OrdersHigh">Orders: High to Low</option>

        <option value="OrdersLow">Orders: Low to High</option>

        <option value="SpentHigh">Spending: High to Low</option>

        <option value="SpentLow">Spending: Low to High</option>
        <option value="NameAsc">Name (A-Z)</option>
        <option value="NameDesc">Name (Z-A)</option>
      </select>
    </div>
  );
};

export default CustomersFilters;
