import axios from "axios";

const API = "https://localhost:7069/api/categories";

export const getCategories = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
