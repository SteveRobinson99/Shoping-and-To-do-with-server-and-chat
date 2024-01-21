import { SafeAreaView, Text, StyleSheet, View, FlatList, Button, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from '@react-navigation/native';
import { ShoppingItemsContext } from "../Contexts/ShoppingItemsContext";


const ShoppingList = () => {
  const navigation = useNavigation();
    const { listItems, setListItems } = useContext(ShoppingItemsContext);
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
          onPress={() => navigation.navigate('Selector')}
        />
      </View>
    );
  };
  
  export default ShoppingList;