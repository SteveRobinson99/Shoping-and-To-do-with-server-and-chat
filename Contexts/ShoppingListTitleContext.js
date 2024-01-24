import React, { createContext, useState, useContext } from "react";

const ShoppingListTitleContext = createContext();
// note the 'customhook' for consuming context
export const useShoppingListTitle = () => useContext(ShoppingListTitleContext);

export const ShoppingListTitleProvider = ({ children }) => {
  const [shoppingListTitle, setShoppingListTitle] = useState("");

  return (
    <ShoppingListTitleContext.Provider
      value={{ shoppingListTitle, setShoppingListTitle }}
    >
      {children}
    </ShoppingListTitleContext.Provider>
  );
};
