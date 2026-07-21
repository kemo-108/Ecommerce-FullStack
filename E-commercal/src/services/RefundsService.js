import axios from "axios";

const API = "https://localhost:7069/api/refunds";

export const GetAllRefunds = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const GetMyRefunds = async () => {
  const response = await axios.get(`${API}/my-refunds`);
  return response.data;
};

export const CreateRefund = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

export const UpdateRefundStatus = async (id, status) => {
  const response = await axios.patch(`${API}/${id}/status`, { status });
  return response.data;
};
