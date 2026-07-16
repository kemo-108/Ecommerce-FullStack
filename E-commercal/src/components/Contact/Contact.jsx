import React from "react";
import "./Contact.css";
import SendMessage from "../../services/ContactService";
import DeleteMessage from "../../services/ContactService";
import From from "../Form/Form";
import Image from "../../image/image-Collection.png";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div className="contact">
      <div className="contactImg">
        <img src={Image} alt="contact" />
        <h1>Contact-us</h1>
        <Link to="/">Home</Link>
      </div>
      <div className="container">
        <div className="map">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799144198!2d-74.2598736877699!3d40.69767006376944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250b9e5b8a7b%3A0x9c6e7a5c5e5e5e5!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1620000000000"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <div className="form">
            <From />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
