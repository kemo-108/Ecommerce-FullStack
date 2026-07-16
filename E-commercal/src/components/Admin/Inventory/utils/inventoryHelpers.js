import { getInventoryStatus } from "./inventoryStatus";
import { STOCK_STATUS } from "../constants/inventoryColumns";

export const getInventoryStats = (products = []) => {
  return products.reduce(
    (stats, product) => {
      const status = getInventoryStatus(
        product.stock,
        product.minStock
      );

      stats.totalProducts++;

      switch (status) {
        case STOCK_STATUS.IN_STOCK:
          stats.inStock++;
          break;

        case STOCK_STATUS.LOW_STOCK:
          stats.lowStock++;
          break;

        case STOCK_STATUS.OUT_OF_STOCK:
          stats.outOfStock++;
          break;

        default:
          break;
      }

      return stats;
    },
    {
      totalProducts: 0,
      inStock: 0,
      lowStock: 0,
      outOfStock: 0,
    }
  );
};