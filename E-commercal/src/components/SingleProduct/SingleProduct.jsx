import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import { AddToCart } from "../../services/CartService";
import { AddToWishlist } from "../../services/WishlistService";
import getProducts from "../../services/ProductService";
import { toast } from "react-toastify";

const TABS = ["Description", "Specifications", "Reviews"];

const SingleProduct = () => {
  const { ProductId } = useParams();
  const navigate = useNavigate();

  const [Product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  useEffect(() => {
    localStorage.setItem("lastViewedProduct", ProductId);
  }, [ProductId]);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    setQuantity(1);
    setActiveTab("Description");

    axios
      .get(`https://localhost:7069/api/Products/${ProductId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      });
  }, [ProductId]);

  useEffect(() => {
    getProducts()
      .then((all) => {
        const filtered = (all || [])
          .filter((p) => String(p.ProductId) !== String(ProductId))
          .slice(0, 4);
        setRelatedProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [ProductId]);

  const activeImage = Product?.imageUrl
    ? `https://localhost:7069/${Product.imageUrl}`
    : "https://placehold.co/700x700?text=No+Image";

  const inStock = Product ? (Product.stock ?? 1) > 0 : false;
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (Product?.stock && next > Product.stock) return Product.stock;
      return next;
    });
  };

  const handleAddToCart = async () => {
    if (!inStock || addingToCart) return;
    setAddingToCart(true);
    try {
      await AddToCart({
        ProductId: Product.ProductId,
        ProductName: Product.ProductName,
        imageUrl: Product.imageUrl,
        price: Product.price,
        Qty: quantity,
      });
      toast.success(`${Product.ProductName} added to cart`);
    } catch (error) {
      console.error(error);
      toast.error("Could not add Product to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!inStock) return;
    await handleAddToCart();
    navigate("/checkout");
  };

  const handleAddToWishlist = async () => {
    if (addingToWishlist) return;
    setAddingToWishlist(true);
    try {
      await AddToWishlist(Product.ProducttId);
      toast.success("Added to wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Could not add to wishlist");
    } finally {
      setAddingToWishlist(false);
    }
  };

  if (notFound) {
    return (
      <div className="sp-loading">
        Product not found. <Link to="/shop">Back to shop</Link>
      </div>
    );
  }

  if (!Product) {
    return <div className="sp-loading">Loading Product...</div>;
  }

  const roundedRating = Math.round(Product.rating || 0);
  const hasDiscount = Product.oldPrice && Product.oldPrice > Product.price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (Product.price / Product.oldPrice) * 100)
    : 0;

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

            <Link to="/shop">Shop</Link>

            <span>/</span>

            <span>{Product.ProductName}</span>
          </div>
        </div>
      </div>

      {/* ================= Product ================= */}

      <div className="container">
        <div className="sp-wrapper">
          {/* ================= Left ================= */}

          <div className="sp-gallery">
            <div className="sp-gallery-main">
              <img src={activeImage} alt={Product.ProductName} />
            </div>
          </div>

          {/* ================= Right ================= */}

          <div className="sp-details">
            <span className="sp-category">{Product.category || "General"}</span>

            <h2 className="sp-title">{Product.ProductName}</h2>

            <div className="sp-rating">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= roundedRating ? (
                  <FiStar key={star} className="sp-star-filled" />
                ) : (
                  <FiStar key={star} />
                ),
              )}

              <span>
                {Product.rating
                  ? `(${Product.rating.toFixed(1)})`
                  : "(No ratings yet)"}
              </span>
            </div>

            <div className="sp-price-wrapper">
              <h3 className="sp-price">
                ${Number(Product.price || 0).toFixed(2)}
              </h3>

              {hasDiscount && (
                <>
                  <del>${Number(Product.oldPrice).toFixed(2)}</del>
                  <span className="sp-discount">-{discountPercent}%</span>
                </>
              )}
            </div>

            <div className={`sp-stock ${inStock ? "" : "sp-out-of-stock"}`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </div>

            <p className="sp-description">{Product.description}</p>

            {/* ================= Quantity ================= */}

            <div className="sp-quantity-wrapper">
              <h4>Quantity</h4>

              <div className="sp-quantity">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={!inStock}
                >
                  <FiMinus />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={!inStock}
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ================= Buttons ================= */}

            <div className="sp-action-buttons">
              <button
                className="sp-cart-btn"
                onClick={handleAddToCart}
                disabled={!inStock || addingToCart}
              >
                <FiShoppingCart />
                {addingToCart ? "Adding..." : "Add To Cart"}
              </button>

              <button
                className="sp-buy-btn"
                onClick={handleBuyNow}
                disabled={!inStock}
              >
                Buy Now
              </button>
            </div>

            <button
              className="sp-wishlist-btn"
              onClick={handleAddToWishlist}
              disabled={addingToWishlist}
            >
              <FiHeart />
              {addingToWishlist ? "Adding..." : "Add To Wishlist"}
            </button>

            {/* ================= Product Info ================= */}

            <div className="sp-Product-meta">
              <div className="sp-meta-item">
                <span>Code</span>

                <p>{Product.code || "N/A"}</p>
              </div>

              <div className="sp-meta-item">
                <span>Category</span>

                <p>{Product.category || "General"}</p>
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
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`sp-tab-btn ${activeTab === tab ? "sp-tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="sp-tab-content">
          {activeTab === "Description" && (
            <p>
              {Product.description ||
                "No description available for this Product."}
            </p>
          )}

          {activeTab === "Specifications" && (
            <ul className="sp-specs-list">
              <li>
                <strong>Code:</strong> {Product.code || "N/A"}
              </li>
              <li>
                <strong>Category:</strong> {Product.category || "General"}
              </li>
              <li>
                <strong>Stock:</strong>{" "}
                {inStock
                  ? `${Product.stock ?? "Available"} units`
                  : "Out of stock"}
              </li>
            </ul>
          )}

          {activeTab === "Reviews" && <p>No reviews yet for this Product.</p>}
        </div>
      </div>

      {/* ================= Related Products ================= */}

      {relatedProducts.length > 0 && (
        <div className="sp-related">
          <div className="sp-section-title">
            <h2>Related Products</h2>

            <p>You may also like these Products.</p>
          </div>

          <div className="sp-related-grid">
            {relatedProducts.map((related) => (
              <Link
                to={`/single-Product/${related.ProductId}`}
                className="sp-related-card"
                key={related.ProductId}
              >
                <img
                  src={`https://localhost:7069/${related.imageUrl}`}
                  alt={related.ProductName}
                />

                <h4>{related.ProductName}</h4>

                <span>${Number(related.price || 0).toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleProduct;
