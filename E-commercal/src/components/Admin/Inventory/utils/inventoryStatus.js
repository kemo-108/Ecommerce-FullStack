import { STOCK_STATUS } from "../constants/inventoryColumns";

export const getInventoryStatus = (stock, minStock) => {
  if (stock <= 0) {
    return STOCK_STATUS.OUT_OF_STOCK;
  }

  if (stock <= minStock) {
    return STOCK_STATUS.LOW_STOCK;
  }

  return STOCK_STATUS.IN_STOCK;
};