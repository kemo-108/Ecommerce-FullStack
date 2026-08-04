import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import HeroImage from "../../image/image-Home.png";
import HeroImage2 from "../../image/image-Home2.png";
import HeroImage3 from "../../image/image-Home3.png";

import AboutImage from "../../image/image-about.png";
import Category1 from "../../image/category1.png";
import Category2 from "../../image/category2.png";
import Category3 from "../../image/category3.png";
import Category4 from "../../image/category4.png";

import { Link } from "react-router-dom";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import getProducts from "../../services/ProductService";
import { getCategories } from "../../services/CategoryService";
import Product from "../Product/Product";

// Used only as a fallback image when a category from the API has no image
const FALLBACK_IMAGES = [Category1, Category2, Category3, Category4];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const stripRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    getProducts().then((data) => setProducts(data || []));
  }, []);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data || []))
      .catch(() => setCategories([]));
  }, []);

  const updateArrows = () => {
    const el = stripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [categories]);

  const scrollStrip = (direction) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * (el.clientWidth * 0.6),
      behavior: "smooth",
    });
  };

  const heroSlides = [HeroImage, HeroImage2, HeroImage3];
  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () =>
    setActiveSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const dealsProducts = products
    .filter((p) => p.oldPrice && p.oldPrice > p.price)
    .slice(0, 10);

  const newProducts = products.slice(0, 10);

  return (
    <>
      {/* ================= Hero banner ================= */}
      <section className="hero-banner">
        <div className="container">
          <div className="hero-banner-inner">
            {heroSlides.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt="Art Corner"
                className={`hero-slide ${index === activeSlide ? "active" : ""}`}
              />
            ))}

            <div className="hero-dots">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`hero-dot ${index === activeSlide ? "active" : ""}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="hero-arrow hero-arrow-left"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              className="hero-arrow hero-arrow-right"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* ================= Category strip ================= */}
      <section className="category-strip">
        <div className="container category-strip-wrap">
          {canScrollLeft && (
            <button
              type="button"
              className="strip-arrow strip-arrow-left"
              onClick={() => scrollStrip(-1)}
              aria-label="Scroll categories left"
            >
              <FiChevronLeft />
            </button>
          )}

          <div
            className="category-strip-inner"
            ref={stripRef}
            onScroll={updateArrows}
          >
            {categories.map((cat, index) => (
              <Link
                to={`/shop?categoryId=${encodeURIComponent(cat.id)}`}
                className="category-chip"
                key={cat.id || cat.name}
              >
                <div className="category-chip-icon">
                  <img
                    src={
                      cat.image ||
                      FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
                    }
                    alt={cat.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
                    }}
                  />
                </div>
                <span>{cat.name}</span>
              </Link>
            ))}

            {/* Always stays last in the row, however many categories are added */}
            <Link to="/category" className="category-chip category-chip-all">
              <div className="category-chip-icon all-icon">
                <FiChevronRight />
              </div>
              <span>All Categories</span>
            </Link>
          </div>

          {canScrollRight && (
            <button
              type="button"
              className="strip-arrow strip-arrow-right"
              onClick={() => scrollStrip(1)}
              aria-label="Scroll categories right"
            >
              <FiChevronRight />
            </button>
          )}
        </div>
      </section>

      {/* ================= Trust badges ================= */}

      {/* ================= Deals grid ================= */}
      <section className="home-section">
        <div className="container">
          <div className="section-head">
            <h2>Today's Deals</h2>
            <Link to="/shop" className="view-all">
              View All <FiChevronRight />
            </Link>
          </div>

          <div className="home-product-grid">
            {dealsProducts.map((product) => (
              <Product
                key={product.productId}
                product={product}
                showExtraBtn={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= Promo tiles ================= */}
      <section className="promo-tiles">
        <div className="container promo-tiles-grid">
          <Link to="/shop" className="promo-tile promo-tile-dark">
            <span className="hero-tag">Limited Offer</span>
            <h3>Back To School Essentials</h3>
            <span className="tile-cta">
              Shop now <FiChevronRight />
            </span>
          </Link>

          <Link to="/shop" className="promo-tile promo-tile-primary">
            <span className="hero-tag">New In</span>
            <h3>Premium Art Supplies</h3>
            <span className="tile-cta">
              Shop now <FiChevronRight />
            </span>
          </Link>
        </div>
      </section>

      {/* ================= New arrivals ================= */}
      <section className="home-section">
        <div className="container">
          <div className="section-head">
            <h2>New Arrivals</h2>
            <Link to="/shop" className="view-all">
              View All <FiChevronRight />
            </Link>
          </div>

          <div className="home-product-grid">
            {newProducts.map((product) => (
              <Product
                key={product.productId}
                product={product}
                showExtraBtn={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= Brand story ================= */}
      <section className="about-strip">
        <div className="container about-strip-inner">
          <div className="about-image">
            <img src={AboutImage} alt="About Art Corner" />
          </div>

          <div className="about-content">
            <span className="hero-tag">Since 2010</span>
            <h2>A company for selling all stationery online</h2>
            <p>
              Your All-In-One Educational Partner For over 15 years, Art Corner
              has been a trusted leader in supplying nurseries, schools, and
              offices. Since our start in 2010, we have specialized in
              transforming educational spaces with high-quality products, from
              essential stationery to complete school outfitting. Why Choose Us?
              Decades of Expertise: A solid reputation built on reliability and
              professional service since 2010. Comprehensive Solutions:
              Everything from the smallest pen to full nursery and classroom
              setups. Unmatched Quality: We provide durable, high-standard
              products designed specifically for the educational sector. We
              don’t just supply equipment; we provide the foundation for a
              better learning environment. Trust the experts who have been doing
              it right for 15 years.
            </p>
            <Link to="/contact" className="btn-outline">
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* ================= Newsletter ================= */}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <h2>Stay in the loop</h2>
            <p>Get new arrivals and offers straight to your inbox.</p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
