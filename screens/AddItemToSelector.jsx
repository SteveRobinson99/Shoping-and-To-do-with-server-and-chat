import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { ShoppingItemsContext } from "../Contexts/ShoppingItemsContext";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import socket from "../utils/socket";

const AddItemToSelector = () => {
  const navigation = useNavigation();
  const { listItems, setListItems } = useContext(ShoppingItemsContext);

  const [itemName, setItemName] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [onList, setOnList] = useState(false);

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      favourite: isFavourite,
      onlist: onList,
      isChecked: false,
    };
    setListItems([...listItems, newItem]);
    socket.emit("addItemToList", { item: newItem });
    // Clear the fields after setting newItem, if needed, shouldn't need as single item, cleared at start
    // setItemName('');
    // setIsFavourite(false);
    // setOnList(false);

    navigation.goBack();
  };

//need remove item logic - add a delete icon to each item on selector like toDo list, use emit with oldItem

  return (
    <View>
      <TextInput
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
      />
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <BouncyCheckbox
          isChecked={isFavourite}
          onPress={(isChecked) => setIsFavourite(isChecked)}
        />
        <Text>Favourite</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <BouncyCheckbox
          isChecked={onList}
          onPress={(isChecked) => setOnList(isChecked)}
        />
        <Text>On List</Text>
      </View>
      <Button onPress={handleAddItem} title="Add Item" />
    </View>
  );
};

export default AddItemToSelector;
