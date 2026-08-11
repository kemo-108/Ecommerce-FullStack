import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/api/settings`;

export const GetSettings = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const UpdateSettings = async (settings) => {
  const response = await axios.put(API, settings);
  return response.data;
};
