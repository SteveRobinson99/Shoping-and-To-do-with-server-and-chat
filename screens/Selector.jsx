import React from 'react';
import { View, Button } from 'react-native';

const Selector = ({ route }) => {
  const { setListItems } = route.params;

  const addItemToList = (newItem) => {
    setListItems(prevItems => [...prevItems, newItem]);
  };

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