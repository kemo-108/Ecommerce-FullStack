// Single source of truth for the backend origin. Every service file and
// image-URL builder in this app used to hardcode "https://localhost:7069"
// directly (37+ occurrences across 20 files), so shipping to a real domain
// meant hunting down every one of them by hand. Change it here instead.
//
// On Vite, set VITE_API_URL in a .env file (see .env.example) to override
// this per environment without touching code. Falls back to the local dev
// backend if no env var is set.
const ENV_URL =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_URL;

export const API_BASE_URL = ENV_URL || "https://localhost:7069";

export default API_BASE_URL;
