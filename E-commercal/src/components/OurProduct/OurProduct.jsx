import React from "react";
import "./OurProduct.css";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import getProducts from "../../services/ProductService";
import Product from "../Product/Product";

const ITEMS_PER_PAGE = 4;

const OurProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getProducts().then((data) => setProducts(data || []));
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const hasArrows = products.length > ITEMS_PER_PAGE;

  const visibleProducts = products.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const goPrev = () => setPage((prev) => Math.max(0, prev - 1));
  const goNext = () =>
    setPage((prev) => Math.min(totalPages - 1, prev + 1));

  return (
    <div className="our-product">
      <div className="container">
        <div className="title-section">
          <h1>Products</h1>
          <h4>Our Products</h4>
        </div>

        <div className="products-row">
          {hasArrows && (
            <button
              type="button"
              className="products-arrow products-arrow-left"
              onClick={goPrev}
              disabled={page === 0}
              aria-label="Previous products"
            >
              <FiChevronLeft />
            </button>
          )}

          <div className="products-container">
            {visibleProducts.map((product) => (
              <Product
                key={product.productId}
                product={product}
                showExtraBtn={true}
              />
            ))}
          </div>

          {hasArrows && (
            <button
              type="button"
              className="products-arrow products-arrow-right"
              onClick={goNext}
              disabled={page === totalPages - 1}
              aria-label="Next products"
            >
              <FiChevronRight />
            </button>
          )}
        </div>

        {hasArrows && (
          <div className="products-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                className={i === page ? "dot dot-active" : "dot"}
                onClick={() => setPage(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurProduct;
