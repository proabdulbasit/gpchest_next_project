import { createContext, useContext, useReducer } from "react";

export const ShopContext = createContext();

export const ShopProvider = ({ reducer, initialState, children }) => (
  <ShopContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ShopContext.Provider>
);

export const useShopValue = () => useContext(ShopContext);
