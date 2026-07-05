const ProductsFilters = ({
  products,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
}) => {
  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <div className="products-filters">
      <input
        type="text"
        placeholder="Search product..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All Categories">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="All Status">All Status</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out Of Stock">Out Of Stock</option>
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="PriceHigh">Price: High to Low</option>
        <option value="PriceLow">Price: Low to High</option>
        <option value="StockHigh">Stock: High to Low</option>
        <option value="StockLow">Stock: Low to High</option>
      </select>
    </div>
  );
};

export default ProductsFilters;
