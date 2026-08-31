import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/api/expenses`;

export const getExpenses = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createExpense = async (expense) => {
  const response = await axios.post(API, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
