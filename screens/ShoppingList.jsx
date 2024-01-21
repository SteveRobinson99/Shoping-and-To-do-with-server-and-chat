import { SafeAreaView, Text, StyleSheet, View, FlatList, Button, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// CheckBox - need to use comunity version 'bouncy checkbox' looks ideal and very customisable

/* Here we will have ListItems array of objects each { {name:"item_name",  favourite:boolean,  onlist:boolean}}
Flatlist 'item_name' iff onlist and check box (which dulls out or strike thro to indicate done)
Favourites at top
links to 'selector component' which can add items (and/or remove items?)

Need; state [listItems, setListItems]
Sort favourites at top
Filter only onlist;true show on Flatlist  {so new array sorted&filtered fed to Flatlist as data}
link to selector - pass prop setListItems via route.params
*/

const ShoppingList = ({ navigation }) => {
    const [listItems, setListItems] = useState([
      { name: "Apples", favourite: true, onlist: true },
      { name: "Bread", favourite: false, onlist: true },
      // Add more items as needed
    ]);
  
    const sortedItems = listItems
      .filter(item => item.onlist)
      .sort((a, b) => (a.favourite === b.favourite) ? 0 : a.favourite ? -1 : 1);
  
    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text>{item.name}</Text>
        <BouncyCheckbox isChecked={false} text={item.onlist} onPress={() => {}} />
      </View>
    );
  
    return (
      <View>
        <FlatList
          data={sortedItems}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
        <Button
          title="Add Items"
          onPress={() => navigation.navigate('Selector', { setListItems })}
        />
      </View>
    );
  };
  
  export default ShoppingList;