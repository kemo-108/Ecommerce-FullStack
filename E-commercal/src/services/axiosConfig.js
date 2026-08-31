import axios from "axios";
import { API_BASE_URL } from "../config/api";

// This used to declare its own separate API_BASE_URL constant here, with a
// different fallback (the production domain) than config/api.js (which
// falls back to the local dev backend). Whichever one happened to apply
// depended on which call site you were looking at - login/guest-session/
// refresh-token went through this file's constant, while every other
// service and all image URLs went through config/api.js's. When no
// VITE_API_URL env var was set, that meant login silently hit production
// while images tried to load from localhost, or vice versa - two
// different backends fighting each other in the same page load. Now
// there's exactly one source of truth, imported here like everywhere
// else.

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

// ---- Silent session refresh -------------------------------------------
// The access token is only valid for a set number of minutes (see
// appsettings.json Jwt:AccessTokenMinutes). Until now, the very first
// request made after it expired got a 401 back and the code below wiped
// the whole session and hard-redirected to /login immediately - even
// though a still-valid refresh token (30 days) was sitting right there in
// localStorage. That's what made the app "log people out" after an hour
// of normal use. We now try the refresh endpoint first and silently retry
// the original request; only a failed refresh (or no refresh token at
// all) actually logs the user out.

// Queues requests that hit a 401 while a refresh is already in flight, so
// three components failing at once don't fire three parallel refresh
// calls (which would race and revoke each other's tokens).
let isRefreshing = false;
let pendingQueue = [];

const resolveQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

const clearSessionAndRedirect = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  localStorage.removeItem("isGuestSession");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Only handle 401s, only once per request (avoid retry loops if the
    // refreshed token is somehow rejected too), and never for the
    // refresh-token call itself (that would loop forever).
    if (
      !response ||
      response.status !== 401 ||
      config._retriedAfterRefresh ||
      (config.url || "").includes("/api/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    const storedRefreshToken = localStorage.getItem("refreshToken");
    if (!storedRefreshToken) {
      // No refresh token to try - this really is a dead session.
      clearSessionAndRedirect();
      return Promise.reject(error);
    }

    config._retriedAfterRefresh = true;

    if (isRefreshing) {
      // A refresh is already happening for another request - wait for it
      // instead of firing a second one, then retry with whatever token
      // that first refresh produced.
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        return axios(config);
      });
    }

    isRefreshing = true;
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {
        refreshToken: storedRefreshToken,
      });

      if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      resolveQueue(null, data.accessToken);

      config.headers.Authorization = `Bearer ${data.accessToken}`;
      return axios(config);
    } catch (refreshError) {
      resolveQueue(refreshError, null);
      clearSessionAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axios;