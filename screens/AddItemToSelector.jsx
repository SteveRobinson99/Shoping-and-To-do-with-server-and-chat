import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { ShoppingItemsContext } from "../Contexts/ShoppingItemsContext";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

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

    // Clear the fields after setting newItem, if needed
    // setItemName('');
    // setIsFavourite(false);
    // setOnList(false);

    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
      />
      <View>
        <Text>Favourite</Text>
        <BouncyCheckbox
          isChecked={isFavourite}
          onPress={(isChecked) => setIsFavourite(isChecked)}
        />
      </View>
      <View>
        <Text>On List</Text>
        <BouncyCheckbox
          isChecked={onList}
          onPress={(isChecked) => setOnList(isChecked)}
        />
      </View>
      <Button onPress={handleAddItem} title="Add Item" />
    </View>
  );
};

export default AddItemToSelector;
