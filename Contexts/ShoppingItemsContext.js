import React, { createContext, useState } from "react";

export const ShoppingItemsContext = createContext();

export const ShoppingItemsProvider = ({ children }) => {
  const [listItems, setListItems] = useState([
    { name: "Bunny Lettuce", favourite: true, onlist: true, isChecked: false },
    { name: "Bread", favourite: false, onlist: true, isChecked: false },
    { name: "Milk", fovourite: true, onlist: true, isChecked: false },
  ]);

  return (
    <ShoppingItemsContext.Provider value={{ listItems, setListItems }}>
      {children}
    </ShoppingItemsContext.Provider>
  );
};
