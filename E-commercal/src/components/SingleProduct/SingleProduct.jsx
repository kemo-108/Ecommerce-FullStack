import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeart,
  FiShoppingCart,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import axios from "axios";
import BannerImage from "../../image/image-Collection.png";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const gallery = [
    "https://placehold.co/700x700?text=Image+1",
    "https://placehold.co/700x700?text=Image+2",
    "https://placehold.co/700x700?text=Image+3",
    "https://placehold.co/700x700?text=Image+4",
  ];

  const [activeImage, setActiveImage] = useState(gallery[0]);

  useEffect(() => {
    localStorage.setItem("lastViewedProduct", productId);
  }, [productId]);

  useEffect(() => {
    axios
      .get(`https://localhost:7005/api/products/${productId}`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.imageUrl) {
          setActiveImage(`https://localhost:7005/${res.data.imageUrl}`);
        }
      })
      .catch((err) => console.log(err));
  }, [productId]);

  if (!product) {
    return <div className="sp-loading">Loading Product...</div>;
  }

  return (
    <section className="sp-page">
      {/* ================= Banner ================= */}

      <div className="sp-banner">
        <img src={BannerImage} alt="Banner" />

        <div className="sp-banner-overlay"></div>

        <div className="sp-banner-content">
          <h1>Product Details</h1>

          <div className="sp-breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <span>Shop</span>

            <span>/</span>

            <span>{product.productName}</span>
          </div>
        </div>
      </div>

      {/* ================= Product ================= */}

      <div className="container">
        <div className="sp-wrapper">
          {/* ================= Left ================= */}

          <div className="sp-gallery">
            <div className="sp-gallery-main">
              <img src={activeImage} alt={product.productName} />
            </div>

            <div className="sp-gallery-list">
              {gallery.map((img, index) => (
                <div
                  key={index}
                  className={`sp-gallery-thumb ${
                    activeImage === img ? "sp-gallery-thumb-active" : ""
                  }`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* ================= Right ================= */}

          <div className="sp-details">
            <span className="sp-category">Electronics</span>

            <h2 className="sp-title">{product.productName}</h2>

            <div className="sp-rating">
              <FiStar />
              <FiStar />
              <FiStar />
              <FiStar />
              <FiStar />

              <span>(128 Reviews)</span>
            </div>

            <div className="sp-price-wrapper">
              <h3 className="sp-price-wrapper">${product.price}</h3>

              <del>$1499</del>

              <span className="sp-discount">-15%</span>
            </div>

            <div className="sp-stock">In Stock</div>

            <p className="sp-description">{product.description}</p>

            {/* Color */}

            <div className="sp-option">
              <h4>Color</h4>

              <div className="sp-colors">
                <span className="sp-color black"></span>

                <span className="sp-color silver"></span>

                <span className="sp-color blue"></span>
              </div>
            </div>

            {/* Size */}

            {/* ================= Storage ================= */}

            <div className="sp-option">
              <h4>Storage</h4>

              <select className="sp-select">
                <option>128 GB</option>
                <option>256 GB</option>
                <option>512 GB</option>
                <option>1 TB</option>
              </select>
            </div>

            {/* ================= Quantity ================= */}

            <div className="sp-quantity-wrapper">
              <h4>Quantity</h4>

              <div className="sp-quantity">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <FiMinus />
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity(quantity + 1)}>
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ================= Buttons ================= */}

            <div className="sp-action-buttons">
              <button className="sp-cart-btn">
                <FiShoppingCart />
                Add To Cart
              </button>

              <button className="sp-buy-btn">Buy Now</button>
            </div>

            <button className="sp-wishlist-btn">
              <FiHeart />
              Add To Wishlist
            </button>

            {/* ================= Product Info ================= */}

            <div className="sp-product-meta">
              <div className="sp-meta-item">
                <span>SKU</span>

                <p>APP-IPH-16PM</p>
              </div>

              <div className="sp-meta-item">
                <span>Category</span>

                <p>Electronics</p>
              </div>

              <div className="sp-meta-item">
                <span>Brand</span>

                <p>Apple</p>
              </div>
            </div>

            {/* ================= Features ================= */}

            <div className="sp-features">
              <div className="sp-feature-card">
                <div className="sp-feature-icon">
                  <FiTruck />
                </div>

                <div>
                  <h5>Free Shipping</h5>

                  <p>Free shipping on all orders over $100.</p>
                </div>
              </div>

              <div className="sp-feature-card">
                <div className="sp-feature-icon">
                  <FiRefreshCw />
                </div>

                <div>
                  <h5>Easy Returns</h5>

                  <p>30 days money back guarantee.</p>
                </div>
              </div>

              <div className="sp-feature-card">
                <div className="sp-feature-icon">
                  <FiShield />
                </div>

                <div>
                  <h5>Secure Payment</h5>

                  <p>Your payment information is fully protected.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================= Product Tabs ================= */}

      <div className="sp-tabs-section">
        <div className="sp-tabs-header">
          <button className="sp-tab-btn sp-tab-active">Description</button>

          <button className="sp-tab-btn">Specifications</button>

          <button className="sp-tab-btn">Reviews</button>
        </div>

        <div className="sp-tab-content">
          <p>
            Experience the next generation of smartphone innovation with the
            iPhone 16 Pro Max. Featuring a stunning display, powerful
            performance, advanced camera system, and exceptional battery life,
            it's designed for users who demand the very best.
          </p>

          <p>
            Built with premium materials and powered by the latest Apple chip,
            this device delivers incredible speed, efficiency, and reliability
            for everyday use, gaming, photography, and professional tasks.
          </p>
        </div>
      </div>

      {/* ================= Related Products ================= */}

      <div className="sp-related">
        <div className="sp-section-title">
          <h2>Related Products</h2>

          <p>You may also like these products.</p>
        </div>

        <div className="sp-related-grid">
          <div className="sp-related-card">
            <img src="https://placehold.co/300x300" alt="" />

            <h4>AirPods Pro</h4>

            <span>$299</span>
          </div>

          <div className="sp-related-card">
            <img src="https://placehold.co/300x300" alt="" />

            <h4>Apple Watch Ultra</h4>

            <span>$799</span>
          </div>

          <div className="sp-related-card">
            <img src="https://placehold.co/300x300" alt="" />

            <h4>MagSafe Charger</h4>

            <span>$59</span>
          </div>

          <div className="sp-related-card">
            <img src="https://placehold.co/300x300" alt="" />

            <h4>Apple Pencil</h4>

            <span>$129</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
