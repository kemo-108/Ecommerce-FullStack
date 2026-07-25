import axios from "axios";

const AUTH_API = "https://localhost:7069/api/auth";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function logoutAndRedirect() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

// Prevents multiple simultaneous refresh calls when several requests
// 401 at the same time (e.g. a page that fires off several API calls at once).
let refreshPromise = null;

function refreshAccessToken() {
  if (!refreshPromise) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return Promise.reject(new Error("No refresh token available."));
    }

    // Use a plain axios call (not the shared instance) so this request
    // doesn't go through these same interceptors and loop on itself.
    refreshPromise = axios
      .post(`${AUTH_API}/refresh-token`, { refreshToken })
      .then((response) => {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        logoutAndRedirect();
        return Promise.reject(refreshError);
      }
    }

    if (error.response && error.response.status === 401 && isAuthEndpoint) {
      logoutAndRedirect();
    }

    return Promise.reject(error);
  }
);
