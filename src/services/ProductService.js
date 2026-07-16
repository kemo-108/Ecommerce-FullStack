import axios from "axios";

const API = "https://localhost:7069/api/products";

export const getProducts = async () => {
  try {
    const { data } = await axios.get(API);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`${API}/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    const { data } = await axios.post(API, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const { data } = await axios.put(`${API}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};