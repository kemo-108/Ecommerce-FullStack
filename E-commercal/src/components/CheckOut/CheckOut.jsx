import React from "react";
import "./CheckOut.css";
const CheckOut = () => {
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
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>

          <select>
            <option>Egypt</option>
          </select>

          <input type="text" placeholder="Street Address" />

          <div className="row">
            <input type="text" placeholder="Town / City" />
            <input type="text" placeholder="Postal Code" />
          </div>

          <div className="row">
            <input type="text" placeholder="Phone" />
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="checkboxes">
            <label>
              <input type="checkbox" />
              Create an account?
            </label>

            <label>
              <input type="checkbox" />
              Ship to different address
            </label>
          </div>
        </div>

        <div className="checkout-side">
          <div className="cart-total">
            <h3>CART TOTAL</h3>

            <div className="item">
              <span>Subtotal</span>
              <span>$240</span>
            </div>

            <div className="item">
              <span>Delivery</span>
              <span>$10</span>
            </div>

            <div className="item">
              <span>Discount</span>
              <span>$30</span>
            </div>
            <hr />
            <div className="checkout-item-total">
              <span>Total</span>
              <span>$220</span>
            </div>
          </div>

          <div className="payment-method">
            <h3>PAYMENT METHOD</h3>

            <label>
              <input type="radio" name="payment" />
              Direct Bank Transfer
            </label>

            <label>
              <input type="radio" name="payment" />
              Check Payment
            </label>

            <label>
              <input type="radio" name="payment" />
              Paypal
            </label>

            <button>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
