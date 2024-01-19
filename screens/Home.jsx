import { SafeAreaView, Text, StyleSheet, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import ShoppingList from "./ShoppingList";

// import ShowModal from "./ShowModal";

const Home = () => {
    //for later use of modal to display content
    const [visible, setVisible] = useState(false);
    return (<View> 
        <Text>'hello world' from Home</Text>
            </View>)
}

export default Home