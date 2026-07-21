import axios from "axios";

const API = "https://localhost:7069/api/dashboard";

export const GetDashboardStats = async () => {
  const response = await axios.get(`${API}/stats`);
  return response.data;
};
