import { useContext, useMemo, useState } from "react";

import { InventoryContext } from "../context/InventoryContext";

import {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct as removeProduct,
  openModal,
  closeModal,
  setSelectedProduct,
  setLoading,
} from "../reducer/inventoryActions";

import { getInventoryStatus } from "../utils/inventoryStatus";
import { getInventoryStats } from "../utils/inventoryHelpers";
import { toast } from "react-toastify";
import {
  GetInventory,
  AddInventory,
  UpdateInventory,
  RestockInventory,
  DeleteInventory,
} from "../../../../services/InventoryService";

const mapRecord = (r) => ({
  id: r.id,
  productId: r.productId,
  name: r.productName,
  imageUrl: r.imageUrl,
  category: r.category,
  warehouse: r.warehouse,
  sku: r.sku,
  barcode: r.barcode,
  stock: r.stock,
  minStock: r.minStock,
  lastUpdated: r.lastUpdated,
});

const useInventory = () => {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error(
      "useInventory must be used within InventoryProvider"
    );
  }

  const { state, dispatch } = context;
  const [saving, setSaving] = useState(false);

  // ==========================================
  // Load Inventory
  // ==========================================
  const loadInventory = async () => {
    dispatch(setLoading(true));
    try {
      const data = await GetInventory();
      dispatch(setProducts(data.map(mapRecord)));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load inventory."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  // NOTE: fetching on mount used to live here, but useInventory() is called
  // by six+ separate components (Content, Table, Row, Filters, Toolbar,
  // Stats, Pagination). Each mount fired its own loadInventory() call,
  // independently flipping the shared `loading` flag true/false at
  // slightly different times as each request resolved — which is what
  // caused the inventory table to flicker on/off. The single fetch-on-load
  // now lives in InventoryContent.jsx instead; this hook only exposes
  // `refreshInventory` for manual re-fetching (e.g. after save/delete).

  const saveAdd = async (payload) => {
    setSaving(true);
    try {
      const created = await AddInventory({
        productId: payload.productId,
        sku: payload.sku,
        barcode: payload.barcode,
        category: payload.category,
        warehouse: payload.warehouse,
        stock: payload.stock,
        minStock: payload.minStock,
      });
      dispatch(addProduct(mapRecord(created)));
      toast.success("Product added to inventory successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product."
      );
    } finally {
      setSaving(false);
    }
  };

  const saveEdit = async (payload) => {
    setSaving(true);
    try {
      const updated = await UpdateInventory(payload.id, {
        sku: payload.sku,
        barcode: payload.barcode,
        minStock: payload.minStock,
      });
      dispatch(updateProduct(mapRecord(updated)));
      toast.success("Inventory details updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update inventory."
      );
    } finally {
      setSaving(false);
    }
  };

  const saveStock = async (payload) => {
    setSaving(true);
    try {
      const updated = await RestockInventory(payload.id, {
        quantity: payload.quantity,
        reason: "Manual restock",
        unitCost: payload.unitCost || null,
      });
      dispatch(updateProduct(mapRecord(updated)));
      toast.success("Stock updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update stock."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteInventoryItem = async (productId) => {
    setSaving(true);
    try {
      await DeleteInventory(productId);
      dispatch(removeProduct(productId));
      toast.success("Product deleted from inventory successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete product."
      );
    } finally {
      setSaving(false);
    }
  };

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
  const openAddModal = () => {
    dispatch(setSelectedProduct(null));
    dispatch(openModal("add"));
  };

  const closeAddModal = () => {
    dispatch(closeModal("add"));
  };

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

    openAddModal,

    closeAddModal,

    openViewModal,

    openEditModal,

    openUpdateStockModal,

    openDeleteModal,

    closeViewModal,

    closeEditModal,

    closeUpdateStockModal,

    closeDeleteModal,

    saveAdd,

    saveEdit,

    saveStock,

    deleteInventoryItem,

    saving,

    loading: state.loading,

    refreshInventory: loadInventory,
  };
};

export default useInventory;