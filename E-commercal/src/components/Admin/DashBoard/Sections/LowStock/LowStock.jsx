import { useEffect, useState } from "react";
import "./LowStock.css";
import { GetInventory } from "../../../../../services/InventoryService";

const LowStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GetInventory()
      .then((data) => {
        const lowStock = data
          .filter((item) => item.stock <= item.minStock)
          .sort((a, b) => a.stock - b.stock)
          .slice(0, 5);
        setProducts(lowStock);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="low-stock">
      <div className="low-stock-header">
        <h3>Low Stock Products</h3>
      </div>

      <div className="low-stock-list">
        {products.length > 0 ? (
          products.map((item) => (
            <div className="low-stock-item" key={item.id}>
              <img src={item.imageUrl} alt={item.productName} />

              <div className="low-stock-info">
                <h4>{item.productName}</h4>
                <span>Stock : {item.stock}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No low stock products.</p>
        )}
      </div>
    </div>
  );
};

export default LowStock;
