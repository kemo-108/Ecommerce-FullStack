import React from "react";
import { useState, useEffect } from "react";
import Product from "../OurProduct/OurProduct";
import Image from "../../image/image-cart.png";
import { getProducts } from "../../services/ProductService";
import "./Cart.css";
import { Link } from "react-router-dom";
const Cart = () => {
  // found error must be soled
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="cart">
      <div className="cartImg">
        <img src={Image} alt="cart" />
        <h1>My Cart</h1>
        <a href="/">Home</a>
      </div>
      <div className="container">
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
                  {products.map((item) => (
                    <tr key={item.productId}>
                      <td>
                        <button className="remove-btn">X</button>
                      </td>
                      <td className="product-cell">
                        <img
                          src={`https://localhost:7005/${item.imageUrl}`}
                          alt={item.productName}
                        />
                        <span>{item.productName}</span>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.Qty}</td>
                      <td>${(item.price * item.Qty).toFixed(2)}</td>
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
            <p>
              Subtotal: $
              {products
                .reduce((total, item) => total + item.price * item.Qty, 0)
                .toFixed(2)}
            </p>
            <br />
            <p>Delivery: $50.00</p>
            <br />
            <p>Discount: $5.00</p>
            <br />
            <hr />
            <br />
            <p>
              Total: $
              {products
                .reduce((total, item) => total + item.price * item.Qty, 0)
                .toFixed(2)}
            </p>
            <br />
            <Link to="/CheckOut">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
      <Product />
    </div>
  );
};

export default Cart;
