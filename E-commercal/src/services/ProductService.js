import axios from "axios";
import React from "react";
const API = "https://localhost:7005/api/products";
export const getProducts = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default getProducts;


