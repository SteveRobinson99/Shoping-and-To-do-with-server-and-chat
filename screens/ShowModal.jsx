import {
  Modal,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import { styles } from "../assets/Styles";
import socket from "../utils/socket";

const ShowModal = ({ setVisible, visible }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      socket.emit("addTodo", input);
      setInput("");
      setVisible(!visible);
    }
  };
  const closeModal = () => {
    setVisible(!visible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(!visible);
      }}
    >
      <SafeAreaView style={styles.modalScreen}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={(value) => setInput(value)}
          placeholder="Enter todo..."
        />

        <Pressable onPress={handleSubmit} style={styles.modalButton}>
          <View>
            <Text style={styles.buttonText}>Add ToDo</Text>
          </View>
        </Pressable>
        <Pressable onPress={closeModal} style={styles.modalButton}>
          <View>
            <Text style={styles.buttonText}>Cancel</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default ShowModal;
