import axios from "axios";

const API = "https://localhost:7069/api/categories";

export const getCategories = async () => {
  try {
    const { data } = await axios.get(API);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const { data } = await axios.get(`${API}/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const { data } = await axios.post(API, category);
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const { data } = await axios.put(`${API}/${id}`, category);
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await axios.delete(`${API}/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export default getCategories;