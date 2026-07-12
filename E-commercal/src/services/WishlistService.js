import axios from "axios";

const API = "https://localhost:7069/api/wishlist";

export const GetWishlist = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const AddToWishlist = async (productId) => {
  const response = await axios.post(API, { productId });
  return response.data;
};

export const RemoveFromWishlist = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
