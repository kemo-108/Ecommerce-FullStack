import { INVENTORY_ACTIONS } from "./actionTypes";

// ==============================
// Products
// ==============================

export const setProducts = (products) => ({
  type: INVENTORY_ACTIONS.SET_PRODUCTS,
  payload: products,
});

export const updateProduct = (product) => ({
  type: INVENTORY_ACTIONS.UPDATE_PRODUCT,
  payload: product,
});

export const deleteProduct = (id) => ({
  type: INVENTORY_ACTIONS.DELETE_PRODUCT,
  payload: id,
});

export const updateStock = (product) => ({
  type: INVENTORY_ACTIONS.UPDATE_STOCK,
  payload: product,
});

// ==============================
// Search & Filters
// ==============================

export const setSearch = (value) => ({
  type: INVENTORY_ACTIONS.SET_SEARCH,
  payload: value,
});

export const setStatus = (value) => ({
  type: INVENTORY_ACTIONS.SET_STATUS,
  payload: value,
});

export const setCategory = (value) => ({
  type: INVENTORY_ACTIONS.SET_CATEGORY,
  payload: value,
});

export const setWarehouse = (value) => ({
  type: INVENTORY_ACTIONS.SET_WAREHOUSE,
  payload: value,
});

export const setSort = (value) => ({
  type: INVENTORY_ACTIONS.SET_SORT,
  payload: value,
});

// ==============================
// Pagination
// ==============================

export const setPage = (page) => ({
  type: INVENTORY_ACTIONS.SET_PAGE,
  payload: page,
});

export const setPageSize = (size) => ({
  type: INVENTORY_ACTIONS.SET_PAGE_SIZE,
  payload: size,
});

// ==============================
// Selected Product
// ==============================

export const setSelectedProduct = (product) => ({
  type: INVENTORY_ACTIONS.SET_SELECTED_PRODUCT,
  payload: product,
});

// ==============================
// Modals
// ==============================

export const openModal = (modal) => ({
  type: INVENTORY_ACTIONS.OPEN_MODAL,
  payload: modal,
});

export const closeModal = (modal) => ({
  type: INVENTORY_ACTIONS.CLOSE_MODAL,
  payload: modal,
});

// ==============================
// UI State
// ==============================

export const setLoading = (value) => ({
  type: INVENTORY_ACTIONS.SET_LOADING,
  payload: value,
});

export const setError = (value) => ({
  type: INVENTORY_ACTIONS.SET_ERROR,
  payload: value,
});