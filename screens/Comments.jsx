import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TextInput, Button, FlatList } from "react-native";

import CommentUI from "./CommentUI";
import { styles } from "../assets/Styles";
import { UserContext } from "../Contexts/UserContext";
import socket from "../utils/socket";

const Comments = ({ navigation, route }) => {
    const [comment, setComment] = useState("");
    const { username } = useContext(UserContext);
    const [user, setUser] = useState("");

    const addComment = () =>{
        socket.emit("addComment", { comment, todo_id: route.params.id, user});
    }
    
    const [commentsList, setCommentsList] = useState([
        {
            id: "1",
            title: "This is a placeholder will be deleted by actual comments",
            user: "Dad",
        },
        {
            id: "2",
            title: "Another placeholder which will be deleted by actual comments",
            user: "Dude",
        },
    ]);

   
    useEffect(() => {
        if (username !== null) {
            // setUser(username);
            navigation.setOptions({
                title: route.params.title,
            });
            socket.emit("retrieveComments", route.params.id);
        } else {
            Alert.alert("Username is required to comment.");
            navigation.navigate("Login");
        }
    }, [username]);
   
    socket.on("retrieveComments", (id) => {
        let result = todoList.filter((todo) => todo._id === id);
        socket.emit("displayComments", result[0].comments);
    });
    useEffect(() => {
        socket.on("displayComments", (data) => setCommentsList(data));
    }, [socket]);

    

    return (
        <View style={styles.screen}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={(value) => setComment(value)}
                    multiline={true}
                />
                <Button title='Post Comment' onPress={addComment} />
            </View>

            <View>
                <FlatList
                    data={commentsList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CommentUI item={item} />}
                />
            </View>
        </View>
    );
};

export default Comments;