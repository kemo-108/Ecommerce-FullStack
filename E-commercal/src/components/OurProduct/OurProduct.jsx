import React from "react";
import "./OurProduct.css";
import { useEffect, useState } from "react";
import getProducts from "../../services/ProductService";
import Product from "../Product/Product";
const OurProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  return (
    <div className="our-product">
      <div className="container">
        <div className="title-section">
          <h1>Products</h1>
          <h4>Our Products</h4>
        </div>
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product.productId}
              product={product}
              showExtraBtn={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProduct;
