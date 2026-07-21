import axios from "axios";

const API = "https://localhost:7069/api/auth";

export const Login = async (credentials) => {
  const response = await axios.post(`${API}/login`, credentials);
  return response.data;
};

export const Register = async (userData) => {
  const response = await axios.post(`${API}/register`, userData);
  return response.data;
};

export const Logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post(`${API}/logout`, { refreshToken });
  return response.data;
};

export const RefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post(`${API}/refresh-token`, { refreshToken });
  return response.data;
};

export const ForgotPassword = async (email) => {
  const response = await axios.post(`${API}/forgot-password`, { email });
  return response.data;
};

export const ResetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API}/reset-password`, {
    token,
    newPassword,
  });
  return response.data;
};

export const GetMe = async () => {
  const response = await axios.get(`${API}/me`);
  return response.data;
};

export const UpdateMe = async (data) => {
  const response = await axios.put(`${API}/me`, data);
  return response.data;
};

export const ChangePassword = async (data) => {
  const response = await axios.post(`${API}/change-password`, data);
  return response.data;
};

export const GetCurrentUser = () => {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
};

export const IsAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

export const SaveSession = (data) => {
  if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
  if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
};

export const ClearSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};
