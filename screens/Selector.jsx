import React, { useState, useContext } from "react";
import { View, Text, FlatList, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AddItemToSelector from "./AddItemToSelector";
import { ShoppingItemsContext } from "../Contexts/ShoppingItemsContext";
import { useNavigation } from '@react-navigation/native';

const Selector = () => {
  const navigation = useNavigation();
  const { listItems, setListItems } = useContext(ShoppingItemsContext);

  const toggleItemOnList = (itemName) => {
    setListItems(
      listItems.map((item) =>
        item.name === itemName ? { ...item, onlist: !item.onlist } : item
      )
    );
  };

  

  // need to add check that item isnt already on list (avoid two childrn with same key (dev) error)
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <Text>{item.name}</Text>
      <BouncyCheckbox
        isChecked={false}
        text={item.onlist}
        onPress={() => toggleItemOnList(item.name)}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={listItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Button
        title="Add Selected Items to the List"
        onPress={() => toggleItemOnList}
      />

      <Button
        title="Add New Item to Selector"
        onPress={() => navigation.navigate('AddItem')}
      />
    </View>
  );
};

export default Selector;
