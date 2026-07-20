import axios from "axios";

const API = "https://localhost:7069/api/products";

const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...(isFormData
        ? { "Content-Type": "multipart/form-data" }
        : {}),
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProducts = async () => {
  const { data } = await axios.get(API);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await axios.post(
    API,
    formData,
    getAuthHeaders(true)
  );

  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    formData,
    getAuthHeaders(true)
  );

  return data;
};

export const deleteProduct = async (id) => {
  await axios.delete(
    `${API}/${id}`,
    getAuthHeaders()
  );

  return true;
};

export default getProducts;