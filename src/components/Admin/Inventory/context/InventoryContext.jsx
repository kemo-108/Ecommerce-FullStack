import { createContext, useReducer } from "react";
import { inventoryReducer } from "../reducer/inventoryReducer";
import { initialState } from "../reducer/initialState";

export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  return (
    <InventoryContext.Provider value={{ state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
