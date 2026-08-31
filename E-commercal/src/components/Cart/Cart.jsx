import React from "react";
import { useState, useEffect } from "react";
import Product from "../OurProduct/OurProduct";
import { GetCart, UpdatCart, DeletetCart } from "../../services/CartService";
import { applyCoupon } from "../../services/CouponsService";
import "./Cart.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/imageUrl";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await GetCart();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Could not load your cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const [removingIds, setRemovingIds] = useState(new Set());

  const handleRemove = async (id) => {
    if (removingIds.has(id)) return; // في نفس الطلب لسه شغال، تجاهل أي ضغطة زيادة

    setRemovingIds((prev) => new Set(prev).add(id));
    try {
      await DeletetCart(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Could not remove item");
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleQuantityChange = async (item, delta) => {
    const newQty = (item.qty || 1) + delta;
    if (newQty < 1) return;

    if (delta > 0 && item.stock != null && newQty > item.stock) {
      toast.error(`Only ${item.stock} unit(s) available in stock.`);
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, qty: newQty } : i)),
    );

    try {
      await UpdatCart(item.id, { ...item, qty: newQty });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Could not update quantity");
      fetchCart();
    }
  };

  const subtotal = items.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || 1),
    0,
  );
  const delivery = items.length > 0 ? 100 : 0;

  // ---------------- Coupon ----------------
  const COUPON_STORAGE_KEY = "cartCouponCode";

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // full result from the API
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const tryApplyCoupon = async (code, currentSubtotal) => {
    const result = await applyCoupon(code, currentSubtotal);
    if (result.valid) {
      setAppliedCoupon(result);
      setCouponCode(result.code);
      localStorage.setItem(COUPON_STORAGE_KEY, result.code);
    } else {
      setAppliedCoupon(null);
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
    return result;
  };

  // Restore a previously applied coupon (e.g. after a page refresh) once the
  // cart has loaded and we know the real subtotal.
  useEffect(() => {
    if (loading) return;
    const savedCode = localStorage.getItem(COUPON_STORAGE_KEY);
    if (!savedCode || items.length === 0) return;

    tryApplyCoupon(savedCode, subtotal).catch(() => {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleApplyCoupon = async () => {
    const code = couponCode.trim();
    if (!code) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    setCouponLoading(true);
    setCouponError("");
    try {
      const result = await tryApplyCoupon(code, subtotal);
      if (result.valid) {
        setCouponError("");
        toast.success(result.message || "Coupon applied.");
      } else {
        setCouponError(result.message || "Invalid coupon code.");
      }
    } catch (error) {
      console.error(error);
      setAppliedCoupon(null);
      localStorage.removeItem(COUPON_STORAGE_KEY);
      setCouponError(
        error.response?.data?.message || "Could not apply coupon. Try again.",
      );
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    localStorage.removeItem(COUPON_STORAGE_KEY);
  };

  // Keep the discount accurate if the cart changes (item removed / qty
  // changed) while a coupon is already applied — re-checks against the
  // new subtotal so percentage discounts and min-order rules stay correct.
  useEffect(() => {
    if (!appliedCoupon) return;

    applyCoupon(appliedCoupon.code, subtotal)
      .then((result) => {
        if (result.valid) {
          setAppliedCoupon(result);
        } else {
          setAppliedCoupon(null);
          localStorage.removeItem(COUPON_STORAGE_KEY);
          setCouponError(result.message || "Coupon no longer applies.");
        }
      })
      .catch(() => {
        // If the recheck itself fails (e.g. network hiccup), leave the
        // previously applied coupon in place instead of clearing it.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal]);

  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const total = subtotal + delivery - discount;
  // -----------------------------------------

  return (
    <div className="cart">
      <div className="container">
        {loading && <p className="cart-status">Loading your cart...</p>}

        {!loading && items.length === 0 && (
          <p className="cart-status">
            Your cart is empty. <Link to="/shop">Continue shopping</Link>
          </p>
        )}

        {!loading && items.length > 0 && (
          <>
            <div className="cart-products">
              <div className="table-wrapper">
                <div className="cart-table">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="remove-cell">
                            <button
                              className="remove-btn"
                              onClick={() => handleRemove(item.id)}
                              disabled={removingIds.has(item.id)}
                            >
                              X
                            </button>
                          </td>
                          <td className="product-cell">
                            <img
                              src={getImageUrl(item.imageUrl)}
                              alt={item.productName}
                            />
                            <div className="product-cell-info">
                              <span>{item.productName}</span>
                              {item.colorName && (
                                <span className="cart-item-color">
                                  <span
                                    className="cart-color-dot"
                                    style={{
                                      backgroundColor:
                                        item.colorHexCode || "#ccc",
                                    }}
                                  />
                                  {item.colorName}
                                </span>
                              )}
                                {item.sizeName && (
                                    <span className="cart-item-color">{item.sizeName}</span>
                                  )}
                            </div>
                          </td>
                          <td data-label="Price"> EGP {Number(item.price || 0).toFixed(2)}</td>
                          <td data-label="Quantity">
                            <div className="qty-control">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item, -1)}
                              >
                                -
                              </button>
                              <span>{item.qty || 1}</span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item, 1)}
                                disabled={
                                  item.stock != null &&
                                  (item.qty || 1) >= item.stock
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td data-label="Total">
                            EGP
                            {(
                              Number(item.price || 0) * (item.qty || 1)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="cart-summary">
              <div className="summary-cart">
                <h2>Cart Summary</h2>
                <br />
                <p>Subtotal: EGP {subtotal.toFixed(2)}</p>
                <br />
                <p>Delivery: EGP {delivery.toFixed(2)}</p>
                <br />
                <p>
                  Discount: - EGP {discount.toFixed(2)}
                  {appliedCoupon && (
                    <span className="coupon-applied-tag">
                      ({appliedCoupon.code})
                    </span>
                  )}
                </p>
                <br />
                <hr />
                <br />
                <p>Total: EGP {total.toFixed(2)}</p>
                <br />

                <div className="coupon-field">
                  <input
                    className="coupon-btn"
                    type="text"
                    placeholder="coupon"
                    value={couponCode}
                    disabled={!!appliedCoupon}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      if (couponError) setCouponError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                  />

                  {appliedCoupon ? (
                    <button
                      type="button"
                      className="coupon-apply-btn"
                      onClick={handleRemoveCoupon}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="coupon-apply-btn"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                    >
                      {couponLoading ? "Checking..." : "Apply"}
                    </button>
                  )}
                </div>

                {couponError && <p className="coupon-error">{couponError}</p>}

                <br />
                <Link to="/checkout">
                  <button className="checkout-btn">Proceed to Checkout</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Product />
    </div>
  );
};

export default Cart;
