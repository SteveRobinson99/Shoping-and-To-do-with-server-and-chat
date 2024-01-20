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

import { styles } from "../assets/Styles"


const ShowModal = ({ setVisible, visible }) => {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (input.trim()) {
            console.log({ input }, "new ToDo input shown at line 20 ShowModal");
            setVisible(!visible);
        }
    };

    return (
        <Modal
            animationType='slide'
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
                />

                <Pressable onPress={handleSubmit} style={styles.modalButton}>
                    <View>
                        <Text style={styles.buttonText}>Add Todo</Text>
                    </View>
                </Pressable>
            </SafeAreaView>
        </Modal>
    );
};

export default ShowModal;