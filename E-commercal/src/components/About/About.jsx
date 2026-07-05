import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import { useInView } from "react-intersection-observer";
import Banner from "../../image/image-Collection.png";
import AboutImg from "../../image/image-about.png";
import Category1 from "../../image/category1.png";
import Category2 from "../../image/category2.png";
import Category3 from "../../image/category3.png";
import Category4 from "../../image/category4.png";

import {
  FaBook,
  FaTruck,
  FaLock,
  FaPalette,
  FaShoppingCart,
  FaCreditCard,
  FaBoxOpen,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const [years, setYears] = useState(0);
  const [products, setProducts] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const animateCounter = (end, setter) => {
      let start = 0;

      const increment = end / 100;

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 20);
    };

    animateCounter(15, setYears);
    animateCounter(5000, setProducts);
    animateCounter(3000, setCustomers);
    animateCounter(12000, setOrders);
  }, [inView]);

  return (
    <>
      {/* Banner */}

      <section className="about-banner">
        <img src={Banner} alt="About Banner" />

        <div className="banner-content">
          <h1>About Us</h1>

          <p>
            <Link to="/">Home</Link> / About
          </p>
        </div>
      </section>

      {/* Who We Are */}

      <section className="about-company container">
        <div className="about-text">
          <span>WHO WE ARE</span>

          <h2>Your Trusted Partner For Educational & Art Supplies</h2>

          <p>
            Art Corner has been helping schools, students, teachers and offices
            since 2010 by providing high-quality stationery, educational
            materials, art supplies and creative tools.
          </p>

          <p>
            Our goal is to inspire creativity and make learning easier by
            offering premium products at affordable prices.
          </p>

          <Link to="/shop" className="about-btn">
            Explore Products
          </Link>
        </div>

        <div className="about-image">
          <img src={AboutImg} alt="About Art Corner" />
        </div>
      </section>
      {/* Why Choose Us */}

      <section className="why-us container">
        <span>WHY CHOOSE ART CORNER</span>

        <h2>Quality You Can Rely On</h2>

        <div className="why-grid">
          <div className="why-card">
            <FaBook />
            <h3>Premium Stationery</h3>
            <p>High quality school and office supplies for every need.</p>
          </div>

          <div className="why-card">
            <FaTruck />
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery across Egypt.</p>
          </div>

          <div className="why-card">
            <FaLock />
            <h3>Secure Payment</h3>
            <p>Safe and trusted payment methods.</p>
          </div>

          <div className="why-card">
            <FaPalette />
            <h3>Wide Collection</h3>
            <p>Everything you need for school, office and creativity.</p>
          </div>
        </div>
      </section>

      {/* Categories */}

      <section className="categories container">
        <span>OUR CATEGORIES</span>

        <h2>Everything For Everyone</h2>

        <div className="category-grid">
          <div className="category-card">
            <img src={Category1} alt="Stationery Supplies" />
            <h3>Stationery Supplies</h3>
          </div>

          <div className="category-card">
            <img src={Category2} alt="School Books" />
            <h3>School Books</h3>
          </div>

          <div className="category-card">
            <img src={Category3} alt="Art Supplies" />
            <h3>Art Supplies</h3>
          </div>

          <div className="category-card">
            <img src={Category4} alt="Educational Toys" />
            <h3>Educational Toys</h3>
          </div>
        </div>
      </section>
      {/* How It Works */}

      <section className="how-work container">
        <span>HOW IT WORKS</span>

        <h2>Shopping Is Easy</h2>

        <div className="work-grid">
          <div className="work-card">
            <FaBook />
            <h3>Choose Products</h3>
          </div>

          <div className="work-card">
            <FaShoppingCart />
            <h3>Add To Cart</h3>
          </div>

          <div className="work-card">
            <FaCreditCard />
            <h3>Checkout</h3>
          </div>

          <div className="work-card">
            <FaBoxOpen />
            <h3>Fast Delivery</h3>
          </div>
        </div>
      </section>

      {/* Achievements */}

      <section className="achievement container" ref={ref}>
        <span>OUR ACHIEVEMENTS</span>

        <h2>Proud Of Our Journey</h2>

        <div className="achievement-grid">
          <div className="achievement-card">
            <FaTrophy />
            <h3>{years.toLocaleString()}+</h3>
            <p>Years Experience</p>
          </div>

          <div className="achievement-card">
            <FaBook />
            <h3>{products.toLocaleString()}+</h3>
            <p>Products</p>
          </div>

          <div className="achievement-card">
            <FaUsers />
            <h3>{customers.toLocaleString()}+</h3> <p>Happy Customers</p>
          </div>

          <div className="achievement-card">
            <FaShoppingCart />
            <h3>{orders.toLocaleString()}+</h3>
            <p>Orders Delivered</p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="about-cta">
        <div className="cta-content">
          <h2>Ready To Inspire Creativity?</h2>

          <p>
            Discover thousands of educational and artistic products that make
            learning fun and creativity endless.
          </p>

          <Link to="/shop" className="cta-btn">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
