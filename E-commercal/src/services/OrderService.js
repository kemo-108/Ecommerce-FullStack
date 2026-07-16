import axios from "axios";

const API = "https://localhost:7069/api/orders";

export const PlaceOrder = async (orderData) => {
  const response = await axios.post(API, orderData);
  return response.data;
};

export const GetMyOrders = async () => {
  const response = await axios.get(`${API}/my-orders`);
  return response.data;
};

export const GetOrderById = async (orderId) => {
  const response = await axios.get(`${API}/${orderId}`);
  return response.data;
};
