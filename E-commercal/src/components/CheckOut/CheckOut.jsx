import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import { GetCart } from "../../services/CartService";
import { PlaceOrder } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const CheckOut = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

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
    (total, item) => total + (item.price || 0) * (item.Qty || 1),
    0
  );
  const delivery = cartItems.length > 0 ? 10 : 0;
  const discount = 0;
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

    setPlacingOrder(true);
    try {
      await PlaceOrder({
        customerName: `${form.firstName} ${form.lastName}`,
        customerEmail: form.email,
        phone: form.phone,
        address: `${form.street}, ${form.city}, ${form.postalCode}, ${form.country}`,
        paymentMethod,
        items: cartItems,
        subtotal,
        shipping: delivery,
        total,
      });
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
        <span>HOME / CHECKOUT</span>
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
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="item">
                  <span>Delivery</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>

                <div className="item">
                  <span>Discount</span>
                  <span>${discount.toFixed(2)}</span>
                </div>
                <hr />
                <div className="checkout-item-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
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
              Check Payment
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Paypal
            </label>

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
