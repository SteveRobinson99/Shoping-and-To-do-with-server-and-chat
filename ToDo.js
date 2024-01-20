import { View, Text, StyleSheet } from "react-native";
import { React } from "react";
import { AntDesign } from "@expo/vector-icons";

const Todo = ({ item }) => {
    return (
        <View style={styles.todoContainer}>
            <View>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text style={styles.subTitle}>View comments</Text>
            </View>
            <View>
                <AntDesign name='delete' size={24} color='red' />
            </View>
        </View>
    );
};
