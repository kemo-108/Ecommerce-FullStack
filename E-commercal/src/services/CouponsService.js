import axios from "axios";

const API = "https://localhost:7069/api/coupons";

export const getCoupons = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createCoupon = async (coupon) => {
  const response = await axios.post(API, coupon);
  return response.data;
};

export const updateCoupon = async (id, coupon) => {
  const response = await axios.put(`${API}/${id}`, coupon);
  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
