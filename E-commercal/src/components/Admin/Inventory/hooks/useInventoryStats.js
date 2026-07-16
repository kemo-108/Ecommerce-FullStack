import { useMemo } from "react";
import { getInventoryStats } from "../utils/inventoryHelpers";

const useInventoryStats = (products) => {
  return useMemo(() => {
    return getInventoryStats(products);
  }, [products]);
};

export default useInventoryStats;