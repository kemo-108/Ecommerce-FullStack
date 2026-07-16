import { useContext, useEffect, useMemo } from "react";

import { InventoryContext } from "../context/InventoryContext";

import inventoryData from "../data/inventoryData";

import {
  setProducts,
  openModal,
  closeModal,
  setSelectedProduct,
} from "../reducer/inventoryActions";

import { getInventoryStatus } from "../utils/inventoryStatus";
import { getInventoryStats } from "../utils/inventoryHelpers";

const useInventory = () => {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error(
      "useInventory must be used within InventoryProvider"
    );
  }

  const { state, dispatch } = context;

  // ==========================================
  // Load Inventory
  // ==========================================
  useEffect(() => {
    if (state.products.length === 0) {
      dispatch(setProducts(inventoryData));
    }
  }, [dispatch, state.products.length]);

  // ==========================================
  // Filter + Sort
  // ==========================================
  const filteredProducts = useMemo(() => {
    let products = [...state.products];

    // Search
    if (state.search.trim()) {
      const keyword = state.search.toLowerCase();

      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.sku.toLowerCase().includes(keyword)
      );
    }

    // Status
    if (state.status !== "All Status") {
      products = products.filter(
        (product) =>
          getInventoryStatus(
            product.stock,
            product.minStock
          ) === state.status
      );
    }

    // Category
    if (state.category !== "All Categories") {
      products = products.filter(
        (product) =>
          product.category === state.category
      );
    }

    // Warehouse
    if (state.warehouse !== "All Warehouses") {
      products = products.filter(
        (product) =>
          product.warehouse === state.warehouse
      );
    }

    // Sort
    switch (state.sortBy) {
      case "nameAsc":
        products.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "nameDesc":
        products.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      case "stockAsc":
        products.sort((a, b) => a.stock - b.stock);
        break;

      case "stockDesc":
        products.sort((a, b) => b.stock - a.stock);
        break;

      default:
        products.sort(
          (a, b) =>
            new Date(b.lastUpdated) -
            new Date(a.lastUpdated)
        );
        break;
    }

    return products;
  }, [
    state.products,
    state.search,
    state.status,
    state.category,
    state.warehouse,
    state.sortBy,
  ]);

  // ==========================================
  // Pagination
  // ==========================================
  const totalProducts = filteredProducts.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalProducts / state.pageSize)
  );

  const currentPage = Math.min(
    state.currentPage,
    totalPages
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) * state.pageSize;

    const end = start + state.pageSize;

    return filteredProducts.slice(start, end);
  }, [
    filteredProducts,
    currentPage,
    state.pageSize,
  ]);

  // ==========================================
  // Stats
  // ==========================================
  const stats = useMemo(() => {
    return getInventoryStats(filteredProducts);
  }, [filteredProducts]);

  // ==========================================
  // Categories
  // ==========================================
  const categories = useMemo(() => {
    return [
      "All Categories",
      ...new Set(
        state.products.map(
          (product) => product.category
        )
      ),
    ];
  }, [state.products]);

  // ==========================================
  // Warehouses
  // ==========================================
  const warehouses = useMemo(() => {
    return [
      "All Warehouses",
      ...new Set(
        state.products.map(
          (product) => product.warehouse
        )
      ),
    ];
  }, [state.products]);

  // ==========================================
  // Modal Handlers
  // ==========================================
  const openViewModal = (product) => {
    dispatch(setSelectedProduct(product));
    dispatch(openModal("view"));
  };

  const openEditModal = (product) => {
    dispatch(setSelectedProduct(product));
    dispatch(openModal("edit"));
  };

  const openUpdateStockModal = (product) => {
    dispatch(setSelectedProduct(product));
    dispatch(openModal("updateStock"));
  };

  const openDeleteModal = (product) => {
    dispatch(setSelectedProduct(product));
    dispatch(openModal("delete"));
  };

  const closeViewModal = () => {
    dispatch(closeModal("view"));
  };

  const closeEditModal = () => {
    dispatch(closeModal("edit"));
  };

  const closeUpdateStockModal = () => {
    dispatch(closeModal("updateStock"));
  };

  const closeDeleteModal = () => {
    dispatch(closeModal("delete"));
  };

  // ==========================================
  // Return
  // ==========================================
  return {
    ...state,

    dispatch,

    products: state.products,

    filteredProducts,

    paginatedProducts,

    categories,

    warehouses,

    stats,

    totalProducts,

    totalPages,

    currentPage,

    pageSize: state.pageSize,

    modals: state.modals,

    selectedProduct: state.selectedProduct,

    openViewModal,

    openEditModal,

    openUpdateStockModal,

    openDeleteModal,

    closeViewModal,

    closeEditModal,

    closeUpdateStockModal,

    closeDeleteModal,
  };
};

export default useInventory;