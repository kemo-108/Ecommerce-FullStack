import React from "react";
import "./Home.css";
import HeroImage from "../../image/image-Home.png";
import AboutImage from "../../image/image-about.png";
import Category1 from "../../image/category1.png";
import Category2 from "../../image/category2.png";
import Category3 from "../../image/category3.png";
import Category4 from "../../image/category4.png";
import { Link } from "react-router-dom";
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";
import NowItems from "../NowItems/NowItems";
import OurProducts from "../OurProduct/OurProduct";
import Advertisement from "../Advertisement/Advertisement";

const CATEGORIES = [
  { name: "Art Supplies", image: Category1, query: "Art Supplies" },
  { name: "Notebooks", image: Category2, query: "Notebooks" },
  { name: "Office Tools", image: Category3, query: "Office Tools" },
  { name: "School Kits", image: Category4, query: "School Kits" },
];

const Home = () => {
  return (
    <>
      {/* ================= Hero ================= */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-eyebrow">Art Corner</span>
            <h1>Everything you need to create, learn and organize.</h1>
            <p>
              Quality stationery, art supplies and school essentials,
              carefully picked and delivered to your door.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/category" className="btn-outline">
                Browse Categories
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img src={HeroImage} alt="Art Corner stationery" />
          </div>
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

      {/* ================= Categories ================= */}
      <section className="home-categories">
        <div className="container">
          <div className="section-heading">
            <h2>Shop by Category</h2>
            <p>Find exactly what you're looking for</p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link
                to={`/shop?search=${encodeURIComponent(cat.query)}`}
                className="category-card"
                key={cat.name}
              >
                <img src={cat.image} alt={cat.name} />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= New Arrivals ================= */}
      <NowItems />

      {/* ================= Brand story ================= */}
      <section className="about-strip">
        <div className="container about-strip-inner">
          <div className="about-image">
            <img src={AboutImage} alt="About Art Corner" />
          </div>

          <div className="about-content">
            <span className="hero-eyebrow">Since 2010</span>
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

      {/* ================= Featured Products ================= */}
      <OurProducts />

      {/* ================= Promo ================= */}
      <Advertisement />

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
