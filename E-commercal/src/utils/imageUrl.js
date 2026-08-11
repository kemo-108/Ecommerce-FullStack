// Product/color images can now be either:
//   1. A Cloudinary URL already, e.g. "https://res.cloudinary.com/.../abc.png"
//   2. A legacy local path, e.g. "uploads/products/abc.png" (pre-migration rows)
//
// Every place that renders an image used to blindly do
// `https://localhost:7069/${product.imageUrl}`, which breaks case (1) by
// producing "https://localhost:7069/https://res.cloudinary.com/...".
// Route everything through this helper instead.

import { API_BASE_URL } from "../config/api";

const PLACEHOLDER = "https://placehold.co/700x700?text=No+Image";

export function getImageUrl(path) {
  if (!path) return PLACEHOLDER;
  if (/^https?:\/\//i.test(path)) return path; // already absolute (Cloudinary, etc.)
  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
}

export default getImageUrl;
