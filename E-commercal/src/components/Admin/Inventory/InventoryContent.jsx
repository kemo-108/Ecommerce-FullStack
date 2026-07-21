import "./Inventory.css";

import useInventory from "./hooks/useInventory";

import InventoryStats from "./Sections/InventoryStats/InventoryStats";
import InventoryToolbar from "./Sections/InventoryToolbar/InventoryToolbar";
import InventoryFilters from "./Sections/InventoryFilters/InventoryFilters";
import InventoryTable from "./Sections/InventoryTable/InventoryTable";
import InventoryPagination from "./Sections/InventoryPagination/InventoryPagination";

import ViewInventoryModal from "./Sections/Modals/ViewInventoryModal/ViewInventoryModal";
import EditInventoryModal from "./Sections/Modals/EditInventoryModal/EditInventoryModal";
import UpdateStockModal from "./Sections/Modals/UpdateStockModal/UpdateStockModal";

const InventoryContent = () => {
  const {
    modals,
    selectedProduct,
    loading,

    closeViewModal,
    closeEditModal,
    closeUpdateStockModal,

    saveEdit,
    saveStock,
  } = useInventory();

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
    </section>
  );
};

export default InventoryContent;
