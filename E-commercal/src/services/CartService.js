import axios from "axios";
import { API_BASE_URL } from "../config/api";
const API = `${API_BASE_URL}/api/cart`;

const notifyCartUpdated = () => {
  window.dispatchEvent(new Event("cart-updated"));
};

export const GetCart = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const AddToCart = async (item) => {
  const response = await axios.post(API, item);
  notifyCartUpdated();
  return response.data;
};

export const UpdatCart = async (id, item) => {
  const response = await axios.put(`${API}/${id}`, item);
  notifyCartUpdated();
  return response.data;
};

export const DeletetCart = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  notifyCartUpdated();
  return response.data;
};
