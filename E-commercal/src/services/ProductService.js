import axios from "axios";
const API = "https://localhost:7069/api/products";

export const getProducts = async () => {
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

export const createProduct = async (formData) => {
  // formData must be a FormData instance when it includes image files
  const response = await axios.post(API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};

export default getProducts;


