import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://brother-group-api.runasp.net";

axios.defaults.baseURL = API_BASE_URL;

// Endpoints a guest must be able to use before ever creating a real
// account - right now just the cart. Everything else (wishlist, orders,
// etc.) is left alone; those already correctly treat a guest as logged out.
const requiresGuestSession = (url = "") => url.includes("/api/cart");

let guestSessionPromise = null;

// Lazily creates (once, even under several concurrent calls) a throwaway
// guest account + token pair so an anonymous shopper can add to cart
// without registering first. See AuthController.CreateGuestSession /
// AuthService.CreateGuestSessionAsync on the backend - that guest account
// gets upgraded in place (Register) or its cart merged in (Login) later.
const ensureGuestSession = () => {
  if (localStorage.getItem("accessToken")) return Promise.resolve();

  if (!guestSessionPromise) {
    guestSessionPromise = axios
      .post(`${API_BASE_URL}/api/auth/guest`)
      .then(({ data }) => {
        if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        // Marks this as a throwaway guest session so IsAuthenticated()
        // (and therefore checkout, wishlist, "my account", etc.) still
        // correctly treats this shopper as NOT logged in.
        localStorage.setItem("isGuestSession", "true");
      })
      .finally(() => {
        guestSessionPromise = null;
      });
  }

  return guestSessionPromise;
};

axios.interceptors.request.use(async (config) => {
  if (!localStorage.getItem("accessToken") && requiresGuestSession(config.url)) {
    try {
      await ensureGuestSession();
    } catch {
      // Couldn't create a guest session - let the request go through
      // token-less. The backend will reject it as before, and the calling
      // component's existing error handling (toast, etc.) takes over.
    }
  }

  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("isGuestSession");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;