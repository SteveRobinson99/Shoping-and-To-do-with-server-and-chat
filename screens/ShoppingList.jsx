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
import React, { useState, useContext, useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import { ShoppingItemsContext } from "../Contexts/ShoppingItemsContext";
import { useShoppingListTitle } from "../Contexts/ShoppingListTitleContext"; //custom hook
import { styles } from "../assets/Styles";
import socket from "../utils/socket";

const ShoppingList = () => {
  const navigation = useNavigation();
  const { shoppingListItems, setShoppingListItems } = useContext(ShoppingItemsContext);
  const [shoppingLists, setShoppingLists] = useState([
    "Quick Shop",
    "Full Shop",
  ]);
  const { shoppingListTitle, setShoppingListTitle } = useShoppingListTitle();
  const [temporaryTitle, setTemporaryTitle] = useState("");
  const sortedItems = shoppingListItems
    .filter((item) => item.onlist)
    .sort((a, b) => (a.favourite === b.favourite ? 0 : a.favourite ? -1 : 1));

  // const handleCheckboxPress = (itemName) => {
  //   // Toggle the isChecked property of the item with the given name
  //   setListItems(
  //     listItems.map((item) =>
  //       item.name === itemName ? { ...item, isChecked: !item.isChecked } : item
  //     )
  //   );
  // };

  //need to re-introduce strikethrough handling (with state to rerender?)

  function handleTitle() {
    setShoppingListTitle(temporaryTitle);
    setShoppingLists([temporaryTitle, ...shoppingLists]);
    socket.emit("addShoppingList", temporaryTitle);
  }

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", padding: 10 }}>
      <BouncyCheckbox
        isChecked={item.isChecked}
        text={item.onlist}
        // onPress={() => handleCheckboxPress(item.name)}
      />
      <Text
        style={item.isChecked ? { textDecorationLine: "line-through" } : null}
      >
        {item.name}
      </Text>
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

  useEffect(() => {
    socket.on("updateShoppingLists", (updatedLists) => {
      setShoppingLists(updatedLists);
    });
    socket.on("updateListItems", (data) => {
      if (data.listTitle === shoppingListTitle) {
        setListItems(data.items);
      }
    });

    return () => {
      socket.off("updateShoppingLists");
      socket.off("updateListItems");
    };
  }, [[shoppingListTitle]]);

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
      <View>
        <Text style={{ color: "black", textAlign: "center", fontSize: 16 }}>
          {shoppingListTitle}
        </Text>
      </View>
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
