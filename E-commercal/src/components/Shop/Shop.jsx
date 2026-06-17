import React from "react";
import Image from "../../image/image-Collection.png";
import { useState, useEffect } from "react";
import { getProducts } from "../../services/ProductService";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop">
      <div className="shopImg">
        <img src={Image} alt="shop" />
        <h1>My Shop</h1>
        <a href="/">Home</a>
      </div>
      <div className="container">
        <div className="shop-products">
          <div className="table-wrapper">
            <div className="shop-table">
              <div className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
