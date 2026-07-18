import axios from "axios";

const API = "https://localhost:7069/api/customers";

export const getCustomers = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await axios.post(API, customer);
  return response.data;
};

export const updateCustomer = async (id, customer) => {
  const response = await axios.put(`${API}/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
