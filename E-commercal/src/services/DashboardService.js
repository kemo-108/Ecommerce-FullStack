import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/api/dashboard`;

export const GetDashboardStats = async () => {
  const response = await axios.get(`${API}/stats`);
  return response.data;
};
