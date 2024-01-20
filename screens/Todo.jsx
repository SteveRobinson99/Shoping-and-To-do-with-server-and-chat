import { View, Text, StyleSheet } from "react-native";
import { React } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../assets/Styles"

const Todo = ({ item }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.todoContainer}>
            <View>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Text style={styles.subTitle}
                onPress={() =>
                    navigation.navigate("Comments", {
                        title: item.title,
                        id: item._id,
                    })
                }>View comments</Text>
            </View>
            <View>
                <AntDesign name='delete' size={24} color='red' />
            </View>
        </View>
    );
};

export default Todo