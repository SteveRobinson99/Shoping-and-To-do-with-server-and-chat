import React, { useState, useContext } from "react";
import { View, Text, FlatList, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AddItemToSelector from "./AddItemToSelector";
import { ShoppingItemsContext } from "../Contexts/ShoppingItemsContext";
import { useNavigation } from "@react-navigation/native";
import socket from "../utils/socket";
import { useShoppingListTitle } from "../Contexts/ShoppingListTitleContext"; //custom hook

const Selector = () => {
  const { shoppingListItems, setShoppingListItems } =
    useContext(ShoppingItemsContext);
  const { shoppingListTitle, setShoppingListTitle } = useShoppingListTitle();
  const navigation = useNavigation();

  const addCheckedItemsToShoppingList = () => {
    const itemsToAdd = shoppingListItems.filter(
      (item) => item.isChecked && !item.onlist
    ); // can add optimistic render to add loacally also for if offline
    socket.emit("addItemsToShoppingList", { shoppingListTitle, itemsToAdd });
  };

  const removeCheckedItemsFromShoppingList = () => {
    const itemsToRemove = shoppingListItems.filter(
      (item) => item.isChecked && item.onlist
      // can add optimistic render to remove loacally also for if offline
    );
    socket.emit("removeItemsFromShoppingList", {
      shoppingListTitle,
      itemsToRemove,
    });
  };

  // need to add check that item isnt already on list (avoid two childrn with same key (dev) error)
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <BouncyCheckbox
        isChecked={item.isChecked}
        onPress={(isChecked) => {
          setShoppingListItems(
            shoppingListItems.map((listItem) =>
              listItem.name === item.name
                ? { ...listItem, isChecked }
                : listItem
            )
          );
        }}
      />
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={shoppingListItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Button
        title="Add Checked Items to List"
        onPress={addCheckedItemsToShoppingList}
      />
      <Button
        title="Remove Checked Items from List"
        onPress={removeCheckedItemsFromShoppingList}
      />

      <Button
        title="Add New Item to Selector"
        onPress={() => navigation.navigate("AddItem")}
      />
    </View>
  );
};

export default Selector;
