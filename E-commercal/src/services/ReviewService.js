import axios from "axios";
import { API_BASE_URL } from "../config/api";

const reviewsUrl = (productId) => `${API_BASE_URL}/api/products/${productId}/reviews`;

export const GetProductReviews = async (productId) => {
  const { data } = await axios.get(reviewsUrl(productId));
  return data; // { averageRating, reviewCount, reviews: [...] }
};

export const SubmitReview = async (productId, { rating, comment }) => {
  const { data } = await axios.post(reviewsUrl(productId), { rating, comment });
  return data;
};

export const DeleteReview = async (productId) => {
  await axios.delete(reviewsUrl(productId));
};

// One batched request for a whole page of product cards, instead of one
// request per card - see useReviewSummaries.
export const GetReviewSummaries = async (productIds = []) => {
  if (!productIds || productIds.length === 0) return [];
  const { data } = await axios.get(`${API_BASE_URL}/api/reviews/summary`, {
    params: { productIds: productIds.join(",") },
  });
  return data; // [{ productId, averageRating, reviewCount }]
};
