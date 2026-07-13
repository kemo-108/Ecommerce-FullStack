import axios from "axios";

const API = "https://localhost:7069/api/wishlist";

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
