import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/api/wishlist`;

const notifyWishlistUpdated = () => {
  window.dispatchEvent(new Event("wishlist-updated"));
};

export const GetWishlist = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const AddToWishlist = async (productId) => {
  const response = await axios.post(API, { productId });
  notifyWishlistUpdated();
  return response.data;
};

export const RemoveFromWishlist = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  notifyWishlistUpdated();
  return response.data;
};
