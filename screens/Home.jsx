import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useLayoutEffect, } from "react";
import ShoppingList from "./ShoppingList";
import socket from "../utils/socket";

import ShowModal from "./ShowModal";
import { styles } from "../assets/Styles"   //(to import rather than local style)
import Todo from "./Todo";

const Home = () => {
   
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);


useLayoutEffect(() => {
        socket.on("todos", (data) => setData(data));
    }, [socket]);

    useLayoutEffect(() => {
        function fetchTodos() {
            fetch("http://192.168.0.20:4000/todos")
                .then((res) => res.json())
                .then((data) => setData(data))
                .catch((err) => console.error(err));
        }
        fetchTodos();
    }, []);

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
