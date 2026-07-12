import axios from "axios";
const API = "https://localhost:7069/api/Products";
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


