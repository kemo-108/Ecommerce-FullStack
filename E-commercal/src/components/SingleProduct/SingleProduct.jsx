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
import "./SingleProduct.css";
import { AddToCart } from "../../services/CartService";
import { AddToWishlist } from "../../services/WishlistService";
import getProducts from "../../services/ProductService";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/imageUrl";
import { API_BASE_URL } from "../../config/api";

const TABS = ["Description", "Specifications", "Reviews"];
const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);
const [manualImage, setManualImage] = useState(null);


  useEffect(() => {
    localStorage.setItem("lastViewedProduct", productId);
  }, [productId]);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    setQuantity(1);
    setActiveTab("Description");
    setManualImage(null);

    axios
      .get(`${API_BASE_URL}/api/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedColor(res.data.colors?.[0] || null);
        setSelectedSize(res.data.sizes?.[0] || null);
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      });
  }, [productId]);

  useEffect(() => {
    getProducts()
      .then((all) => {
        const filtered = (all || [])
          .filter((p) => String(p.productId) !== String(productId))
          .slice(0, 12);
        setRelatedProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [productId]);

  const rawActiveImage = manualImage || selectedColor?.imageUrl || product?.imageUrl;
  const activeImage = getImageUrl(rawActiveImage);

  // All the photos worth showing as thumbnails: the main image, every extra
  // gallery photo, and the current color's photo (if it has one and isn't
  // already in the list). Deduplicated so the same file doesn't show twice.
  const galleryThumbs = product
    ? [
        product.imageUrl,
        ...(product.galleryImages || []),
        selectedColor?.imageUrl,
      ].filter((url, index, all) => url && all.indexOf(url) === index)
    : [];

  const LOW_STOCK_THRESHOLD = 10;

  const inStock = product ? (product.qty ?? 0) > 0 : false;
  const isLowStock =
    inStock && product?.qty != null && product.qty <= LOW_STOCK_THRESHOLD;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (product?.qty && next > product.qty) return product.qty;
      return next;
    });
  };

  const handleAddToCart = async () => {
    if (!inStock || addingToCart) return;
    setAddingToCart(true);
    try {
      await AddToCart({
        productId: product.productId,
        productName: product.productName,
        imageUrl: product.imageUrl,
        price: product.price,
        Qty: quantity,
        ColorName: selectedColor?.name || null,
        ColorHexCode: selectedColor?.hexCode || null,
        SizeName: selectedSize?.name || null,
      });
      toast.success(`${product.productName} added to cart`);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error("Please create an account to add items to your cart");
      } else {
        toast.error("Could not add product to cart");
      }
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
      await AddToWishlist(product.productId);
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

  if (!product) {
    return <div className="sp-loading">Loading Product...</div>;
  }

  const roundedRating = Math.round(product.rating || 0);
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : 0;

  return (
    <div className="sp-page">
      <div className="container">
        <div className="sp-wrapper">
          {/* ================= Left ================= */}

          <div className="sp-gallery">
            {galleryThumbs.length > 1 && (
              <div className="sp-gallery-list">
                {galleryThumbs.map((url) => (
                  <button
                    key={url}
                    type="button"
                    className={`sp-gallery-thumb ${
                      rawActiveImage === url ? "sp-gallery-thumb-active" : ""
                    }`}
                    onClick={() => setManualImage(url)}
                  >
                    <img src={getImageUrl(url)} alt={product.productName} />
                  </button>
                ))}
              </div>
            )}

            <div className="sp-gallery-main">
              <img src={activeImage} alt={product.productName} />
            </div>
          </div>

          {/* ================= Right ================= */}

          <div className="sp-details">
            <span className="sp-category">{product.category || "General"}</span>

            <h2 className="sp-title">{product.productName}</h2>

            <div className="sp-rating">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= roundedRating ? (
                  <FiStar key={star} className="sp-star-filled" />
                ) : (
                  <FiStar key={star} />
                ),
              )}

              <span>
                {product.rating
                  ? `( ${product.rating.toFixed(1)})`
                  : "(No ratings yet)"}
              </span>
            </div>

            <div className="sp-price-wrapper">
              <h3 className="sp-price">
                EGP {Number(product.price || 0).toFixed(2)}
              </h3>

              {hasDiscount && (
                <>
                  <del> EGP {Number(product.oldPrice).toFixed(2)}</del>
                  <span className="sp-discount">-{discountPercent}%</span>
                </>
              )}
            </div>

            <div className={`sp-stock ${inStock ? "" : "sp-out-of-stock"}`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </div>
            {inStock && product.colors && product.colors.length > 0 && (
              <div className="sp-color-section">
                <h4>Color{selectedColor ? `: ${selectedColor.name}` : ""}</h4>

                <div className="sp-color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      className={`sp-color-swatch ${selectedColor?.id === color.id ? "sp-color-active" : ""} ${
                        color.imageUrl ? "sp-color-photo" : "sp-color-dot"
                      }`}
                      style={
                        !color.imageUrl
                          ? { backgroundColor: color.hexCode || "#ccc" }
                          : undefined
                      }
                      onClick={() => {
                        setSelectedColor(color);
                        setManualImage(null);
                      }}
                      title={color.name}
                    >
                      {color.imageUrl && (
                        <img
                          src={getImageUrl(color.imageUrl)}
                          alt={color.name}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && (
  <div className="sp-size-section">
    <h4>Size{selectedSize ? `: ${selectedSize.name}` : ""}</h4>

    <div className="sp-size-options">
      {product.sizes.map((size) => (
        <button
          key={size.id}
          type="button"
          className={`sp-size-pill ${selectedSize?.id === size.id ? "sp-size-active" : ""}`}
          onClick={() => setSelectedSize(size)}
        >
          {size.name}
        </button>
      ))}
    </div>
  </div>
)}
            <p className="sp-description">{product.description}</p>

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

              {isLowStock && (
                <p className="sp-low-stock">
                  Only {product.qty} left in stock!
                </p>
              )}
            </div>

            {/* ================= Buttons ================= */}

            {inStock && (
              <div className="sp-action-buttons">
                <button
                  className="sp-cart-btn"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  <FiShoppingCart />
                  {addingToCart ? "Adding..." : "Add To Cart"}
                </button>

                <button className="sp-buy-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            )}

            <button
              className="sp-wishlist-btn"
              onClick={handleAddToWishlist}
              disabled={addingToWishlist}
            >
              <FiHeart />
              {addingToWishlist ? "Adding..." : "Add To Wishlist"}
            </button>

            {/* ================= Product Info ================= */}

            <div className="sp-product-meta">
              <div className="sp-meta-item">
                <span>Code</span>

                <p>{product.code || "N/A"}</p>
              </div>

              <div className="sp-meta-item">
                <span>Category</span>

                <p>{product.category || "General"}</p>
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

                  <p>Free shipping on all orders over EGP 3000.</p>
                </div>
              </div>

              <div className="sp-feature-card">
                <div className="sp-feature-icon">
                  <FiRefreshCw />
                </div>

                <div>
                  <h5>Easy Returns</h5>

                  <p>15 days money back guarantee.</p>
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
              {product.description ||
                "No description available for this product."}
            </p>
          )}

          {activeTab === "Specifications" && (
            <ul className="sp-specs-list">
              <li>
                <strong>Code:</strong> {product.code || "N/A"}
              </li>
              <li>
                <strong>Category:</strong> {product.category || "General"}
              </li>
              <li>
                <strong>Stock:</strong>{" "}
                {inStock
                  ? `${product.qty ?? "Available"} units`
                  : "Out of stock"}
              </li>
            </ul>
          )}

          {activeTab === "Reviews" && <p>No reviews yet for this product.</p>}
        </div>
      </div>

      {/* ================= Related Products ================= */}

      {relatedProducts.length > 0 && (
        <div className="sp-related">
          <div className="sp-section-title">
            <h2>Related Products</h2>

            <p>You may also like these products.</p>
          </div>

          <div className="sp-related-grid">
            {relatedProducts.map((related) => (
              <Link
                to={`/single-product/${related.productId}`}
                className="sp-related-card"
                key={related.productId}
              >
                <img
                  src={getImageUrl(related.imageUrl)}
                  alt={related.productName}
                />

                <h4>{related.productName}</h4>

                <span> EGP {Number(related.price || 0).toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
