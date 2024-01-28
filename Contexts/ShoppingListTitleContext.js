import React, { createContext, useState, useContext } from "react";

const ShoppingListTitleContext = createContext();
// note the 'custom hook' for consuming context
// this context is for keeping track of the sinlge active list for a user, the one they are looking at and interacting with. It doesnt hold all available titles.
// the titles are held in state; shoppingLists is a list of available shopping list titles.
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
