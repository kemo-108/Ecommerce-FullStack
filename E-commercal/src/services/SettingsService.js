import axios from "axios";

const API = "https://localhost:7069/api/settings";

export const GetSettings = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const UpdateSettings = async (settings) => {
  const response = await axios.put(API, settings);
  return response.data;
};
