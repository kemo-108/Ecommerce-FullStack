import { useEffect, useState } from "react";
import { GetReviewSummaries } from "../services/ReviewService";

// Fetches average-rating/review-count for a batch of products in ONE
// request (same idea as useWishlist - one call for the whole page instead
// of one per card). Pass the list of productIds currently on screen.
export const useReviewSummaries = (productIds = []) => {
  const [summaries, setSummaries] = useState({});

  // A stable string key so the effect only re-runs when the actual set of
  // ids changes, not on every render (arrays get a new identity each time).
  const key = [...new Set(productIds)].sort((a, b) => a - b).join(",");

  useEffect(() => {
    if (!key) {
      setSummaries({});
      return;
    }

    let cancelled = false;
    GetReviewSummaries(key.split(",").map(Number))
      .then((list) => {
        if (cancelled) return;
        const map = {};
        (list || []).forEach((item) => {
          map[item.productId] = item;
        });
        setSummaries(map);
      })
      .catch(() => {
        if (!cancelled) setSummaries({});
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return summaries; // { [productId]: { averageRating, reviewCount } }
};

export default useReviewSummaries;
