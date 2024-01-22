import { View, Text, StyleSheet } from "react-native";
import { React } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import socket from "../utils/socket";
import { styles } from "../assets/Styles";

const Todo = ({ item }) => {
  const navigation = useNavigation();

  const deleteTodo = (id) => socket.emit("deleteTodo", id);

  return (
    <View style={styles.todoContainer}>
      <View>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Text
          style={styles.subTitle}
          onPress={() =>
            navigation.navigate("Comments", {
              title: item.title,
              id: item._id,
            })
          }
        >
          View comments
        </Text>
      </View>
      <View>
      <TouchableOpacity onPress={() => deleteTodo(item._id)}>
        <AntDesign
          name="delete"
          size={24}
          color="red"
        />
         </TouchableOpacity>
      </View>
    </View>
  );
};

export default Todo;
