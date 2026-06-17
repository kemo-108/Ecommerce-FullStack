import React from "react";
import "./Footer.css";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import { SiGooglemaps } from "react-icons/si";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="box">
          <div className="social-icons">
            <h3>Art Corner</h3>

            <div className="icons">
              <a href="#">
                <FaSquareFacebook />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="box">
          <h4>Menu</h4>

          <a href="">Shop</a>
          <a href="">About</a>
          <a href="">Journal</a>
          <a href="">Contact Us</a>
        </div>

        <div className="box">
          <h4>help</h4>

          <a href="">Shipping Information</a>
          <a href="">Returns & Exchange</a>
          <a href="">Terms & Conditions</a>
          <a href="">Privacy Policy</a>
        </div>

        <div className="box">
          <div className="contact-info">
            <h4>Have a Questions?</h4>
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
