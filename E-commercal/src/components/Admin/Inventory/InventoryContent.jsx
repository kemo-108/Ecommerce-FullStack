import "./Inventory.css";

import { useEffect } from "react";
import useInventory from "./hooks/useInventory";

import InventoryStats from "./Sections/InventoryStats/InventoryStats";
import InventoryToolbar from "./Sections/InventoryToolbar/InventoryToolbar";
import InventoryFilters from "./Sections/InventoryFilters/InventoryFilters";
import InventoryTable from "./Sections/InventoryTable/InventoryTable";
import InventoryPagination from "./Sections/InventoryPagination/InventoryPagination";

import AddInventoryModal from "./Sections/Modals/AddInventoryModal/AddInventoryModal";
import ViewInventoryModal from "./Sections/Modals/ViewInventoryModal/ViewInventoryModal";
import EditInventoryModal from "./Sections/Modals/EditInventoryModal/EditInventoryModal";
import UpdateStockModal from "./Sections/Modals/UpdateStockModal/UpdateStockModal";
import DeleteInventoryModal from "./Sections/Modals/DeleteInventoryModal/DeleteInventoryModal";

const InventoryContent = () => {
  const {
    modals,
    selectedProduct,
    loading,

    closeAddModal,
    closeViewModal,
    closeEditModal,
    closeUpdateStockModal,
    closeDeleteModal,

    saveAdd,
    saveEdit,
    saveStock,
    deleteInventoryItem,
    refreshInventory,
  } = useInventory();

  // Single source of truth for the initial fetch — every other component
  // under this page just reads the shared state via useInventory(), it
  // does not re-fetch on its own.
  useEffect(() => {
    refreshInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="inventory">
      {/* Header */}
      <div className="inventory-header">
        <div className="inventory-header-text">
          <h1>Inventory</h1>
          <p>Manage product stock and warehouse</p>
        </div>
      </div>

      <InventoryStats />

      <InventoryToolbar />

      <InventoryFilters />

      {loading ? <p>Loading inventory...</p> : <InventoryTable />}

      <InventoryPagination />

      {/* Add Modal */}
      {modals.add && (
        <AddInventoryModal
          onClose={closeAddModal}
          onSave={async (payload) => {
            await saveAdd(payload);
            closeAddModal();
          }}
        />
      )}

      {/* View Modal */}
      {modals.view && (
        <ViewInventoryModal
          product={selectedProduct}
          onClose={closeViewModal}
        />
      )}

      {/* Edit Modal */}
      {modals.edit && (
        <EditInventoryModal
          product={selectedProduct}
          onClose={closeEditModal}
          onSave={async (payload) => {
            await saveEdit(payload);
            closeEditModal();
          }}
        />
      )}

      {/* Update Stock Modal */}
      {modals.updateStock && (
        <UpdateStockModal
          product={selectedProduct}
          onClose={closeUpdateStockModal}
          onSave={async (payload) => {
            await saveStock(payload);
            closeUpdateStockModal();
          }}
        />
      )}

      {/* Delete Modal */}
      {modals.delete && (
        <DeleteInventoryModal
          product={selectedProduct}
          onClose={closeDeleteModal}
          onDelete={async (productId) => {
            await deleteInventoryItem(productId);
            closeDeleteModal();
          }}
        />
      )}
    </section>
  );
};

export default InventoryContent;
