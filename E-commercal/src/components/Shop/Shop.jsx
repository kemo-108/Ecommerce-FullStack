import React, { useState, useEffect } from "react";
import Image from "../../image/image-Collection.png";
import axios from "axios";
import "./Shop.css";
import { Link, useSearchParams } from "react-router-dom";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const pageSize = 12;

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`https://localhost:7069/api/products`, {
        params: {
          page,
          pageSize,
          search: searchQuery || undefined,
        },
      })
      .then((response) => {
        const data = response.data;
        // Backend may return either a plain array or a paginated shape.
        if (Array.isArray(data)) {
          setProducts(data);
          setTotalProducts(data.length);
        } else {
          setProducts(data.products || []);
          setTotalProducts(data.totalProducts || 0);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [page, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  return (
    <div className="shop">
      <div className="shopImg">
        <img src={Image} alt="shop" />
        <h1>My Shop</h1>
        <a href="/">Home</a>
      </div>

      <div className="container">
        {searchQuery && (
          <p className="shop-search-info">
            Search results for: <strong>{searchQuery}</strong>
          </p>
        )}

        {loading && <p className="shop-status">Loading products...</p>}

        {!loading && error && (
          <p className="shop-status">
            Something went wrong while loading products. Please try again.
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="shop-status">No products found.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="product-grid">
              {products.map((product) => (
                <Link
                  to={`/single-product/${product.productId}`}
                  key={product.productId}
                  className="product-card"
                >
                  <img
                    src={`https://localhost:7069/${product.imageUrl}`}
                    alt={product.productName}
                  />

                  <h2>{product.productName}</h2>
                  <p>${Number(product.price || 0).toFixed(2)}</p>
                </Link>
              ))}
            </div>

            <div className="pagination">
              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
              >
                {"<"}
              </button>

              {[...Array(totalPages).keys()].map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber + 1)}
                  className={page === pageNumber + 1 ? "active" : ""}
                >
                  {pageNumber + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
              >
                {">"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
