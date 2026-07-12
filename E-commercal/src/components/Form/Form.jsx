import React, { useState } from "react";
import "../Form/Form.css";
const Form = () => {
  const [name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      productName: name,
      price: Number(Price),
    };
    try {
      const response = await fetch("https://localhost:7069/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      console.log("added:", data);
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" value={name}></input>
        <input type="Email" placeholder="Your Email" />
        <input type="text" plذaceholder="Subject" />
        <textarea placeholder="Your Message"></textarea>
        <button className="send-massage-btn" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Form;
