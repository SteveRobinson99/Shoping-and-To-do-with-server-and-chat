import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { styles } from "../assets/Styles";

const CommentUI = ({ item }) => {
    return (
        <View style={styles.comment}>
            <View style={styles.message}>
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
            </View>

            <View>
                <Text>{item.user}</Text>
            </View>
        </View>
    );
};

export default CommentUI;