import React from "react";
import "./Contact.css";
import SendMessage from "../../services/ContactService";
import DeleteMessage from "../../services/ContactService";
import From from "../Form/Form";
import { Link } from "react-router-dom";
const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {};
    const formElements = e.target.elements;
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    try {
      await SendMessage(formData);
      alert("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Us</h1>
        <Link to="/">Home</Link>
        <p>&gt; Contact</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="FullName" placeholder="your name" />
          <input type="text" name="Email" placeholder="Your Email" />
          <input type="text" name="Subject" placeholder="Subject" />
          <textarea type="text" name="Message" placeholder="Your Message" />
          <button type="submit">Send Message</button>
          <button type="reset" onClick={() => DeleteMessage()}>
            Reset
          </button>
        </form>
        <From />
      </div>
    </div>
  );
};
export default Contact;
