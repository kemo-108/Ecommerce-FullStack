import axios from "axios";

const API = "https://localhost:7069/api/addresses";

export const GetMyAddresses = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const CreateAddress = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

export const UpdateAddress = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

export const DeleteAddress = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};

export const SetDefaultAddress = async (id) => {
  const response = await axios.patch(`${API}/${id}/default`);
  return response.data;
};