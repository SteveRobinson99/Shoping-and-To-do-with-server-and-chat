import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import { ShoppingItemsContext } from "../Contexts/ShoppingItemsContext";
import { styles } from "../assets/Styles";

const ShoppingList = () => {
  const navigation = useNavigation();
  const { listItems, setListItems } = useContext(ShoppingItemsContext);
  const [shoppingLists, setShoppingLists] = useState([
    "Quick Shop",
    "Full Shop",
  ]);
  const [shoppingListTitle, setShoppingListTitle] = useState("");
  const [temporaryTitle, setTemporaryTitle] = useState("");
  const sortedItems = listItems
    .filter((item) => item.onlist)
    .sort((a, b) => (a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1));

  const handleCheckboxPress = (itemName) => {
    // Toggle the isChecked property of the item with the given name
    setListItems(
      listItems.map((item) =>
        item.name === itemName ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  function handleTitle() {
    setShoppingListTitle(temporaryTitle);
    setShoppingLists([temporaryTitle, ...shoppingLists]);
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <Text
        style={item.isChecked ? { textDecorationLine: "line-through" } : null}
      >
        {item.name}
      </Text>
      <BouncyCheckbox
        isChecked={item.isChecked}
        text={item.onlist}
        onPress={() => handleCheckboxPress(item.name)}
      />
    </View>
  );
  const renderShoppingListTitle = ({ item }) => (
    <TouchableOpacity
      // style={styles.listitem}
      onPress={() => setShoppingListTitle(item)}
    >
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  );

  return shoppingListTitle == "" ? (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        Provide a Title for your new Shopping List, or pick an existing list
        below
      </Text>
      <TextInput
        style={styles.textInput}
        value={temporaryTitle}
        onChangeText={(value) => setTemporaryTitle(value)}
      />
      <Pressable onPress={handleTitle} style={styles.loginButton}>
        <View>
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
            Set Title
          </Text>
        </View>
      </Pressable>
      <FlatList
        data={shoppingLists}
        renderItem={renderShoppingListTitle}
        keyExtractor={(item) => item}
      />
    </View>
  ) : (
    <View>
      <FlatList
        data={sortedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Button
        title="Add Items"
        onPress={() => navigation.navigate("Selector")}
      />
    </View>
  );
};

export default ShoppingList;
