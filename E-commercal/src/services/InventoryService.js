import axios from "axios";

const API = "https://localhost:7069/api/inventory";

export const GetInventory = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const UpdateInventory = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

export const RestockInventory = async (id, data) => {
  const response = await axios.post(`${API}/${id}/restock`, data);
  return response.data;
};

export const GetStockMovements = async (id) => {
  const response = await axios.get(`${API}/${id}/movements`);
  return response.data;
};
