import InventoryProvider from "./context/InventoryContext";
import InventoryContent from "./InventoryContent";

const Inventory = () => {
  return (
    <InventoryProvider>
      <InventoryContent />
    </InventoryProvider>
  );
};

export default Inventory;
