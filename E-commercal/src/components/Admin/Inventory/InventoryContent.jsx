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
import DeleteInventoryModal from "./Sections/Modals/DeletenventoryModal/DeletenventoryModal";

const InventoryContent = () => {
  const {
    modals,
    selectedProduct,

    closeViewModal,
    closeEditModal,
    closeUpdateStockModal,
    closeDeleteModal,
  } = useInventory();

  return (
    <section className="inventory">
      {/* Header */}
      <div className="inventory-header">
        <div className="inventory-header-text">
          <h1>Inventory</h1>
          <p>Manage product stock and warehouse</p>
        </div>

        <button className="restock-btn">+ Restock Product</button>
      </div>

      <InventoryStats />

      <InventoryToolbar />

      <InventoryFilters />

      <InventoryTable />

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
          onSave={(product) => {
            console.log(product);
            closeEditModal();
          }}
        />
      )}

      {/* Update Stock Modal */}
      {modals.updateStock && (
        <UpdateStockModal
          product={selectedProduct}
          onClose={closeUpdateStockModal}
          onSave={(product) => {
            console.log(product);
            closeUpdateStockModal();
          }}
        />
      )}

      {/* Delete Modal */}
      {modals.delete && (
        <DeleteInventoryModal
          product={selectedProduct}
          onClose={closeDeleteModal}
          onDelete={(id) => {
            console.log(id);
            closeDeleteModal();
          }}
        />
      )}
    </section>
  );
};

export default InventoryContent;
