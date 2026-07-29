import axios from "axios";

const API = "https://localhost:7069/api/reports";

export const GetSalesReport = async () => {
  const response = await axios.get(` ${API}/sales`);
  return response.data;
};

export const GetProductsReport = async () => {
  const response = await axios.get(` ${API}/products`);
  return response.data;
};

export const GetCustomersReport = async () => {
  const response = await axios.get(` ${API}/customers`);
  return response.data;
};