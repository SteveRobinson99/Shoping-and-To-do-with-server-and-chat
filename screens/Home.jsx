import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import ShoppingList from "./ShoppingList";


import ShowModal from "./ShowModal";
import { styles } from "../assets/Styles"   //(to import rather than local style)
import Todo from "./Todo";

const Home = () => {
    //for  use of modal to display 'todo' content (shopping via second modal or child tbc)
    const [visible, setVisible] = useState(false);
    // hard code sample prior to setting up Socket
    const [data, setData] = useState([
        { _id: "1", title: "Hello from 1", comments: [] },
        { _id: "2", title: "Hello from 2", comments: [] },
    ]);
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.heading}>Todos</Text>
                <Ionicons
                    name='create-outline'
                    size={30}
                    color='black'
                    onPress={() => setVisible(!visible)}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Todo item={item} />}
                />
            </View>
            <ShowModal setVisible={setVisible} visible={visible} />
        </SafeAreaView>
    );
};

export default Home
