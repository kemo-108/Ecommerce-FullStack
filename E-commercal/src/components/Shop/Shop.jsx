import React, { useState, useEffect } from "react";
// import Image from "../../image/image-Collection.png";
import axios from "axios";
import "./Shop.css";
import { useSearchParams } from "react-router-dom";
import Product from "../Product/Product";
import { getCategories } from "../../services/CategoryService";
import { API_BASE_URL } from "../../config/api";
import { useWishlist } from "../../hooks/useWishlist";
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  // The URL is the single source of truth for which category is selected,
  // so links coming from Home/Category/Header always land on the right filter.
  const categoryIdParam = searchParams.get("categoryId");
  const selectedCategoryId = categoryIdParam ? Number(categoryIdParam) : null;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const wishlist = useWishlist();

  const pageSize = 32;

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
      .get(`${API_BASE_URL}/api/products`, {
        params: {
          page,
          pageSize,
          search: searchQuery || undefined,
          categoryId: selectedCategoryId || undefined,
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
  }, [page, searchQuery, selectedCategoryId]);

  // Filtering now happens on the server (search + categoryId), so the
  // fetched page is already correct - just apply sorting for display.
  const filteredProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
  const pagedProducts = filteredProducts;

  // Builds a compact page list like [1, '...', 4, 5, 6, '...', 12]
  // instead of rendering a button for every single page.
  const getPageNumbers = (current, total) => {
    const siblings = 1; // pages shown on each side of the current page
    const totalNumbers = siblings * 2 + 5; // first, last, current, 2 dots, siblings

    if (total <= totalNumbers) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblings, 1);
    const rightSibling = Math.min(current + siblings, total);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < total - 1;

    const pages = [1];

    if (showLeftDots) pages.push("dots-left");

    for (let i = leftSibling === 1 ? 2 : leftSibling; i <= (rightSibling === total ? total - 1 : rightSibling); i++) {
      if (i !== 1 && i !== total) pages.push(i);
    }

    if (showRightDots) pages.push("dots-right");

    pages.push(total);

    return pages;
  };

  const selectCategory = (categoryId) => {
    const next = new URLSearchParams(searchParams);
    next.delete("search");
    if (categoryId) {
      next.set("categoryId", String(categoryId));
    } else {
      next.delete("categoryId");
    }
    setSearchParams(next);
  };

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
                  onClick={() => selectCategory(null)}
                >
                  All Products
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={selectedCategoryId === cat.id ? "active" : ""}
                    onClick={() => selectCategory(cat.id)}
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

            {!loading && !error && totalProducts === 0 && (
              <p className="shop-status">No products found.</p>
            )}

            {!loading && !error && totalProducts > 0 && (
              <>
                <div className="shop-toolbar">
                  <span>{totalProducts} products</span>
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
                      wishlist={wishlist}
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

                  {getPageNumbers(page, totalPages).map((pageNumber, idx) =>
                    typeof pageNumber === "number" ? (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={page === pageNumber ? "active" : ""}
                      >
                        {pageNumber}
                      </button>
                    ) : (
                      <span key={pageNumber + idx} className="pagination-dots">
                        ...
                      </span>
                    )
                  )}

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
