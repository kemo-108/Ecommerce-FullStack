import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { SiGooglemaps } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="box">
          <div className="social-icons">
            <h3>Art Corner</h3>

            <p className="footer-tagline">
              Quality stationery and art supplies for every creative mind.
            </p>

            <div className="icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaSquareFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <div className="box">
          <h4>Menu</h4>

          <Link to="/shop">Shop</Link>
          <Link to="/category">Categories</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="box">
          <h4>Help</h4>

          <Link to="/account/orders">Track Order</Link>
          <Link to="/account/returns">Returns & Exchange</Link>
          <Link to="/contact">Shipping Information</Link>
          <Link to="/contact">Contact Support</Link>
        </div>

        <div className="box">
          <div className="contact-info">
            <h4>Have a Question?</h4>
            <p>
              <SiGooglemaps />
              123 Main Street, Anytown, USA
            </p>

            <p>
              <FaPhoneVolume />
              (123) 456-7890
            </p>

            <p>
              <BiLogoGmail />
              info@artcorner.com
            </p>
          </div>
        </div>
      </div>

      <p className="copyright">
        Copyright ©2026 All rights reserved | This template is made with by
        <span className="author"> Art Corner</span>
      </p>
    </div>
  );
};

export default Footer;
