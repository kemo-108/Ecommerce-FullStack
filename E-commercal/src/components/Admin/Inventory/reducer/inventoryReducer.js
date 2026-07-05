import { INVENTORY_ACTIONS } from "./actionTypes";
import { initialState } from "./initialState";

export const inventoryReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    // ==========================
    // Products
    // ==========================
    case INVENTORY_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case INVENTORY_ACTIONS.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId ===
          action.payload.productId
            ? action.payload
            : product
        ),
      };

    case INVENTORY_ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) =>
            product.productId !== action.payload
        ),
      };

    case INVENTORY_ACTIONS.UPDATE_STOCK:
      return {
        ...state,
        products: state.products.map((product) =>
          product.productId ===
          action.payload.productId
            ? action.payload
            : product
        ),
      };

    // ==========================
    // Search
    // ==========================
    case INVENTORY_ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        currentPage: 1,
      };

    // ==========================
    // Filters
    // ==========================
    case INVENTORY_ACTIONS.SET_STATUS:
      return {
        ...state,
        status: action.payload,
        currentPage: 1,
      };

    case INVENTORY_ACTIONS.SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        currentPage: 1,
      };

    case INVENTORY_ACTIONS.SET_WAREHOUSE:
      return {
        ...state,
        warehouse: action.payload,
        currentPage: 1,
      };

    // ==========================
    // Sort
    // ==========================
    case INVENTORY_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload,
      };

    // ==========================
    // Pagination
    // ==========================
    case INVENTORY_ACTIONS.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case INVENTORY_ACTIONS.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload,
        currentPage: 1,
      };

    // ==========================
    // Selected Product
    // ==========================
    case INVENTORY_ACTIONS.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
      };

    // ==========================
    // Modals
    // ==========================
    case INVENTORY_ACTIONS.OPEN_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload]: true,
        },
      };

    case INVENTORY_ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload]: false,
        },
      };

    // ==========================
    // UI
    // ==========================
    case INVENTORY_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case INVENTORY_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};