const ProductsStats = ({ products }) => {
  const totalProducts = products.length;

  const inStock = products.filter((product) => product.qty > 10).length;

  const lowStock = products.filter(
    (product) => product.qty > 0 && product.qty <= 10
  ).length;

  const outOfStock = products.filter((product) => product.qty === 0).length;

  return (
    <div className="products-stats">
      <div className="stat-card">
        <h3>{totalProducts}</h3>
        <p>Total Products</p>
      </div>

      <div className="stat-card">
        <h3>{inStock}</h3>
        <p>In Stock</p>
      </div>

      <div className="stat-card">
        <h3>{lowStock}</h3>
        <p>Low Stock</p>
      </div>

      <div className="stat-card">
        <h3>{outOfStock}</h3>
        <p>Out Of Stock</p>
      </div>
    </div>
  );
};

export default ProductsStats;
