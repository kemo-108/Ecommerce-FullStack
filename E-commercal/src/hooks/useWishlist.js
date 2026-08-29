import { useCallback, useEffect, useState } from "react";
import { GetWishlist } from "../services/WishlistService";
import { IsAuthenticated } from "../services/AuthService";

// Fetches the wishlist ONCE for the whole page (instead of once per
// product card) and keeps it fresh by re-fetching whenever any card
// dispatches the "wishlist-updated" event (add/remove).
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const refresh = useCallback(() => {
    if (!IsAuthenticated()) {
      setWishlist([]);
      return;
    }
    GetWishlist()
      .then((items) => setWishlist(items || []))
      .catch(() => setWishlist([]));
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("wishlist-updated", refresh);
    return () => window.removeEventListener("wishlist-updated", refresh);
  }, [refresh]);

  return wishlist;
};

export default useWishlist;
