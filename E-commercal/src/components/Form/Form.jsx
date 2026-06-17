import React, { useState } from "react";
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
      const response = await fetch("https://localhost:7005/api/products", {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">product name:</label>
        <input
          type="text"
          placeholder="Name product"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label htmlFor="price">product price:</label>
        <input
          type="number"
          placeholder="Price product"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add product</button>
      </form>
    </div>
  );
};

export default Form;
