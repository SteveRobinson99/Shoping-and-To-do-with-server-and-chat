import React, { useLayoutEffect, useState, useContext } from "react";
import { View, StyleSheet, TextInput, Button, FlatList } from "react-native";

import CommentUI from "./CommentUI";
import { styles } from "../assets/Styles";
import { UserContext } from "../Contexts/UserContext";

const Comments = ({ navigation, route }) => {
    const [comment, setComment] = useState("");
    const { username } = useContext(UserContext);
    const [commentsList, setCommentsList] = useState([
        {
            id: "1",
            title: "Thank you",
            user: "David",
        },
        {
            id: "2",
            title: "All right",
            user: "David",
        },
    ]);
    const [user, setUser] = useState("");

   
          
            if (username !== null) {
                setUser(username);
                console.log({ user }, "is loggedin, accessed via context line 29 comments")
            } else {
                Alert.alert("Username is required to comment.");
                navigation.navigate("Login")
            }
        

   
    // logs the comment details to the console
    const addComment = () => console.log({ comment, user }, "newcomment logged line 38 Comments");

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