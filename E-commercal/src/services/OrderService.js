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

export const GetAllOrders = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const AdminCreateOrder = async (orderData) => {
  const response = await axios.post(`${API}/admin`, orderData);
  return response.data;
};

export const UpdateOrderStatus = async (orderId, status) => {
  const response = await axios.patch(`${API}/${orderId}/status`, { status });
  return response.data;
};

export const DeleteOrder = async (orderId) => {
  const response = await axios.delete(`${API}/${orderId}`);
  return response.data;
};
