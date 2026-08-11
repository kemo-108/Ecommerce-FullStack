import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/api/returns`;

export const GetMyReturns = async () => {
  const response = await axios.get(`${API}/my-returns`);
  return response.data;
};

export const GetAllReturns = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const CreateReturn = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

export const UpdateReturnStatus = async (id, status) => {
  const response = await axios.patch(`${API}/${id}/status`, { status });
  return response.data;
};
