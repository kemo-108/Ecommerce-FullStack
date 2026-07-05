import React, { useState, useEffect } from "react";
import Image from "../../image/image-Collection.png";
import axios from "axios";
import "./Shop.css";
import { Link } from "react-router-dom";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const pageSize = 12;

  useEffect(() => {
    axios
      .get(
        `https://localhost:7005/api/products?page=${page}&pageSize=${pageSize}`,
      )
      .then((response) => {
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  return (
    <div className="shop">
      <div className="shopImg">
        <img src={Image} alt="shop" />
        <h1>My Shop</h1>
        <a href="/">Home</a>
      </div>

      <div className="container">
        <div className="product-grid">
          {products.map((product) => (
            <Link
              to={`/single-product/${product.productId}`}
              key={product.productId}
              className="product-card"
            >
              <img
                src={`https://localhost:7005/${product.imageUrl}`}
                alt={product.productName}
              />

              <h2>{product.productName}</h2>
              <p>${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>

        <div className="pagination">
          {/* Previous Button */}
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            {"<"}
          </button>

          {/* Page Numbers */}
          {[...Array(Math.ceil(totalProducts / pageSize)).keys()].map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber + 1)}
                className={page === pageNumber + 1 ? "active" : ""}
              >
                {pageNumber + 1}
              </button>
            ),
          )}

          {/* Next Button */}
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === Math.ceil(totalProducts / pageSize)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
