import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/api/reports`;

export const GetSalesReport = async () => {
  const response = await axios.get(`${API}/sales`);
  return response.data;
};

export const GetProductsReport = async () => {
  const response = await axios.get(`${API}/products`);
  return response.data;
};

export const GetCustomersReport = async () => {
  const response = await axios.get(`${API}/customers`);
  return response.data;
};