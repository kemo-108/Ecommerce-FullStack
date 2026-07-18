import React, { useEffect, useState } from "react";
import "./Home.css";
import HeroImage from "../../image/image-Home.png";
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
} from "react-icons/fi";
import { getProducts } from "../../services/ProductService";
import Product from "../Product/Product";

const CATEGORIES = [
  { name: "Art Supplies", image: Category1, query: "Art Supplies" },
  { name: "Notebooks", image: Category2, query: "Notebooks" },
  { name: "Office Tools", image: Category3, query: "Office Tools" },
  { name: "School Kits", image: Category4, query: "School Kits" },
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data || []));
  }, []);

  const dealsProducts = products.slice(0, 10);
  const newProducts = products.slice(10, 20);

  return (
    <>
      {/* ================= Hero banner ================= */}
      <section className="hero-banner">
        <div className="container">
          <div className="hero-banner-inner">
            <img src={HeroImage} alt="Art Corner" />

            <div className="hero-banner-content">
              <span className="hero-tag">New Season</span>
              <h1>Everything for school, office &amp; art — in one place</h1>
              <p>Top brands, best prices, fast delivery all over Egypt.</p>
              <Link to="/shop" className="btn-primary">
                Shop Now <FiChevronRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Category strip ================= */}
      <section className="category-strip">
        <div className="container category-strip-inner">
          {CATEGORIES.map((cat) => (
            <Link
              to={`/shop?search=${encodeURIComponent(cat.query)}`}
              className="category-chip"
              key={cat.name}
            >
              <div className="category-chip-icon">
                <img src={cat.image} alt={cat.name} />
              </div>
              <span>{cat.name}</span>
            </Link>
          ))}

          <Link to="/category" className="category-chip category-chip-all">
            <div className="category-chip-icon all-icon">
              <FiChevronRight />
            </div>
            <span>All Categories</span>
          </Link>
        </div>
      </section>

      {/* ================= Trust badges ================= */}
      <section className="trust-bar">
        <div className="container trust-grid">
          <div className="trust-item">
            <FiTruck />
            <div>
              <h4>Free Shipping</h4>
              <p>On orders over $100</p>
            </div>
          </div>

          <div className="trust-item">
            <FiShield />
            <div>
              <h4>Secure Payment</h4>
              <p>100% protected checkout</p>
            </div>
          </div>

          <div className="trust-item">
            <FiRefreshCw />
            <div>
              <h4>Easy Returns</h4>
              <p>30 day return policy</p>
            </div>
          </div>

          <div className="trust-item">
            <FiHeadphones />
            <div>
              <h4>Support</h4>
              <p>We're here to help</p>
            </div>
          </div>
        </div>
      </section>

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
