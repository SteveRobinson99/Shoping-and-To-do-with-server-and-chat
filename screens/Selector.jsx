import React from 'react';
import { View, Button } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Selector = ({ route }) => {
  const { setListItems } = route.params;

  const addItemToList = (newItem) => {
    setListItems(prevItems => [...prevItems, newItem]);
  };
// need to add check that item isnt already on list (avoid two childrn with same key (dev) error)
  return (
    <View>
      <Button
        title="Add Example Item"
        onPress={() => addItemToList({ name: "New Item", favourite: false, onlist: true })}
      />
     
    </View>
  );
};

export default Selector;