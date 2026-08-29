import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import { GetCart } from "../../services/CartService";
import { PlaceOrder } from "../../services/OrderService";
import { applyCoupon } from "../../services/CouponsService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import vodafoneCash from "../../image/vodafone-cash.png";
import instaPay from "../../image/instapay.png";
import { IsAuthenticated } from "../../services/AuthService";
const COUPON_STORAGE_KEY = "cartCouponCode";
const CHECKOUT_FORM_STORAGE_KEY = "checkoutFormDraft";

const initialForm = {
  firstName: "",
  lastName: "",
  country: "Egypt",
  street: "",
  city: "",
  postalCode: "",
  phone: "",
  email: "",
  createAccount: false,
  shipToDifferent: false,
};

const loadSavedForm = () => {
  try {
    const saved = sessionStorage.getItem(CHECKOUT_FORM_STORAGE_KEY);
    return saved ? { ...initialForm, ...JSON.parse(saved) } : initialForm;
  } catch {
    return initialForm;
  }
};

const CheckOut = () => {
  const navigate = useNavigate();
  // Restored from sessionStorage so the billing details the customer
  // already typed survive the redirect to Register/Login and back.
  const [form, setForm] = useState(loadSavedForm);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    GetCart()
      .then((data) => setCartItems(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        toast.error("Could not load your cart");
      })
      .finally(() => setLoadingCart(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.qty || 1),
    0,
  );
  const delivery = cartItems.length > 0 ? 100 : 0;

  // Re-validate whatever coupon was applied back on the Cart page, against
  // this page's own subtotal — same reasoning as the cart: codes can expire
  // or fall out of MinOrder range between "Apply" and checkout.
  useEffect(() => {
    if (loadingCart || cartItems.length === 0) return;

    const savedCode = localStorage.getItem(COUPON_STORAGE_KEY);
    if (!savedCode) return;

    applyCoupon(savedCode, subtotal)
      .then((result) => {
        if (result.valid) {
          setAppliedCoupon(result);
        } else {
          setAppliedCoupon(null);
          localStorage.removeItem(COUPON_STORAGE_KEY);
        }
      })
      .catch(() => setAppliedCoupon(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCart, subtotal]);

  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const total = subtotal + delivery - discount;

  const requiredFields = [
    "firstName",
    "lastName",
    "street",
    "city",
    "postalCode",
    "phone",
    "email",
  ];

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (requiredFields.some((field) => !form[field])) {
      toast.error("Please fill in all billing details");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    // Guests must create an account (or log in to an existing one) before
    // the order is actually placed. Logged-in customers pass straight
    // through. We send new customers to Register (which links back to
    // Login), and remember /checkout as "from" so either page can return
    // them here afterwards instead of dropping them on their profile.
    if (!IsAuthenticated()) {
      try {
        sessionStorage.setItem(CHECKOUT_FORM_STORAGE_KEY, JSON.stringify(form));
      } catch {
        // ignore storage failures (e.g. private browsing quota) - worst
        // case the customer just retypes their details, nothing breaks.
      }
      toast.info("Please create an account to complete your order");
      navigate("/register", { state: { from: "/checkout" } });
      return;
    }

    setPlacingOrder(true);
    try {
      await PlaceOrder({
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        phone: form.phone,
        address: `${form.street}, ${form.city}, ${form.postalCode}, ${form.country}`,
        paymentMethod,
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          imageUrl: item.imageUrl,
          price: item.price,
          quantity: item.qty,
          colorName: item.colorName,
          colorHexCode: item.colorHexCode,
          sizeName: item.sizeName,
        })),
        subtotal,
        shipping: delivery,
        total,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
      });
      // The order has been placed (with the coupon usage recorded server-side
      // if one applied), so clear it for the next cart.
      localStorage.removeItem(COUPON_STORAGE_KEY);
      sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
      toast.success("Order placed successfully!");
      navigate("/account/orders");
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Could not place your order";
      toast.error(message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-header">
        <h1>CHECKOUT</h1>
        <Link to="/" style={{ color: "var(--primary)" }}>
          HOME
        </Link>
        <span style={{ fontSize: "15px" }}> &gt; CHECKOUT</span>
      </div>

      <div className="checkout-container">
        <div className="billing-details">
          <h3>BILLING DETAILS</h3>

          <div className="row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <select name="country" value={form.country} onChange={handleChange}>
            <option>Egypt</option>
          </select>

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleChange}
          />

          <div className="row">
            <input
              type="text"
              name="city"
              placeholder="Town / City"
              value={form.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="checkboxes">
            <label>
              <input
                type="checkbox"
                name="createAccount"
                checked={form.createAccount}
                onChange={handleChange}
              />
              Create an account?
            </label>

            <label>
              <input
                type="checkbox"
                name="shipToDifferent"
                checked={form.shipToDifferent}
                onChange={handleChange}
              />
              Ship to different address
            </label>
          </div>
        </div>

        <div className="checkout-side">
          <div className="cart-total">
            <h3>CART TOTAL</h3>

            {loadingCart ? (
              <p>Loading cart...</p>
            ) : cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div className="item">
                  <span>Subtotal</span>
                  <span> EGP {subtotal.toFixed(2)}</span>
                </div>

                <div className="item">
                  <span>Delivery</span>
                  <span> EGP {delivery.toFixed(2)}</span>
                </div>

                <div className="item">
                  <span>Discount</span>
                  <span>
                    - EGP {discount.toFixed(2)}
                    {appliedCoupon ? ` ( ${appliedCoupon.code})` : ""}
                  </span>
                </div>
                <hr />
                <div className="checkout-item-total">
                  <span>Total</span>
                  <span> EGP {total.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          <div className="payment-method">
            <h3>PAYMENT METHOD</h3>

            <label>
              <input
                type="radio"
                name="payment"
                value="bank_transfer"
                checked={paymentMethod === "bank_transfer"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Direct Bank Transfer
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="check"
                checked={paymentMethod === "check"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery (COD)
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="cash_transfer"
                checked={paymentMethod === "cash_transfer"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Vodafone Cash or InstaPay
            </label>

            {paymentMethod === "cash_transfer" && (
              <div className="payment-info">
                <div className="payment-option">
                  <img src={vodafoneCash} alt="Vodafone Cash" />
                  <span>01014884658</span>
                </div>

                <div className="payment-option">
                  <img src={instaPay} alt="InstaPay" />
                  <span>01142570416</span>
                </div>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder || loadingCart}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
