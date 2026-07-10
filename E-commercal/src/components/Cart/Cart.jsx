import React from "react";
import { useState, useEffect } from "react";
import Product from "../OurProduct/OurProduct";
import Image from "../../image/image-cart.png";
import { GetCart, UpdatCart, DeletetCart } from "../../services/CartService";
import "./Cart.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  const handleRemove = async (id) => {
    try {
      await DeletetCart(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Could not remove item");
    }
  };

  const handleQuantityChange = async (item, delta) => {
    const newQty = (item.Qty || 1) + delta;
    if (newQty < 1) return;

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, Qty: newQty } : i))
    );

    try {
      await UpdatCart(item.id, { ...item, Qty: newQty });
    } catch (error) {
      console.error(error);
      toast.error("Could not update quantity");
      fetchCart();
    }
  };

  const subtotal = items.reduce(
    (total, item) => total + (item.price || 0) * (item.Qty || 1),
    0
  );
  const delivery = items.length > 0 ? 50 : 0;
  const discount = 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="cart">
      <div className="cartImg">
        <img src={Image} alt="cart" />
        <h1>My Cart</h1>
        <a href="/">Home</a>
      </div>
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
                          <td>
                            <button
                              className="remove-btn"
                              onClick={() => handleRemove(item.id)}
                            >
                              X
                            </button>
                          </td>
                          <td className="product-cell">
                            <img
                              src={`https://localhost:7005/${item.imageUrl}`}
                              alt={item.productName}
                            />
                            <span>{item.productName}</span>
                          </td>
                          <td>${Number(item.price || 0).toFixed(2)}</td>
                          <td>
                            <div className="qty-control">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item, -1)}
                              >
                                -
                              </button>
                              <span>{item.Qty || 1}</span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(item, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>
                            ${(Number(item.price || 0) * (item.Qty || 1)).toFixed(2)}
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
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <br />
                <p>Delivery: ${delivery.toFixed(2)}</p>
                <br />
                <p>Discount: ${discount.toFixed(2)}</p>
                <br />
                <hr />
                <br />
                <p>Total: ${total.toFixed(2)}</p>
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
