import axios from "axios";

const API = "https://localhost:7069/api/returns";

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
