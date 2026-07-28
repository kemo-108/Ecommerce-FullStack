import React, { useState, useEffect } from "react";
// import Image from "../../image/image-Collection.png";
import axios from "axios";
import "./Shop.css";
import { useSearchParams } from "react-router-dom";
import Product from "../Product/Product";
import { getCategories } from "../../services/CategoryService";
const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortOption, setSortOption] = useState("default");

  const pageSize = 12;

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategoryId]);

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

  const filteredProducts = products
    .filter((p) => !selectedCategoryId || p.categoryId === selectedCategoryId)
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pagedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="shop">
      <div className="container">
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <ul className="category-list">
              <li>
                <button
                  className={!selectedCategoryId ? "active" : ""}
                  onClick={() => setSelectedCategoryId(null)}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={selectedCategoryId === cat.id ? "active" : ""}
                    onClick={() => setSelectedCategoryId(cat.id)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="shop-main">
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

            {!loading && !error && filteredProducts.length === 0 && (
              <p className="shop-status">No products found.</p>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
              <>
                <div className="shop-toolbar">
                  <span>{filteredProducts.length} products</span>
                  <select
                    className="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="default">Sort: Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>

                <div className="product-grid">
                  {pagedProducts.map((product) => (
                    <Product
                      key={product.productId}
                      product={product}
                      showExtraBtn={true}
                    />
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
      </div>
    </div>
  );
};

export default Shop;
