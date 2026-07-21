import { useEffect, useState } from "react";
import "./TopProducts.css";
import { GetDashboardStats } from "../../../../../services/DashboardService";

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetDashboardStats()
      .then((stats) => setProducts(stats.topProducts || []))
      .catch(() => {});
  }, []);

  return (
    <div className="top-products">
      <div className="top-products-header">
        <h3>Top Selling Products</h3>
      </div>

      <div className="top-products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-item" key={product.productId}>
              <img src={product.imageUrl} alt={product.productName} />

              <div className="product-info">
                <h4>{product.productName}</h4>
                <p>${Number(product.revenue).toFixed(2)} revenue</p>
              </div>

              <span>{product.quantitySold} Sales</span>
            </div>
          ))
        ) : (
          <p>No sales data yet.</p>
        )}
      </div>
    </div>
  );
};

export default TopProducts;
