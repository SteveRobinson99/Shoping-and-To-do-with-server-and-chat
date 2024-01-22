import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, FlatList } from "react-native";

import CommentUI from "./CommentUI";
import { styles } from "../assets/Styles";
import { UserContext } from "../Contexts/UserContext";
import socket from "../utils/socket";

const Comments = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const { username } = useContext(UserContext);
  const [commentsList, setCommentsList] = useState([]);

  const addComment = () => {
    if (comment.trim()) {
      socket.emit("addComment", {
        comment,
        todo_id: route.params.id,
        user: username,
      });
      setComment(""); // Clear the input field after sending the comment
    }
  };

  useEffect(() => {
    const displayCommentsHandler = (comments) => {
      setCommentsList(comments);
    };
    if (username) {
      // sets title in header dynamically for each ToDo
      navigation.setOptions({
        title: route.params.title,
      });
      socket.emit("retrieveComments", route.params.id);
      socket.on("displayComments", displayCommentsHandler);
    } else {
      Alert.alert("Username is required to comment.");
      navigation.navigate("Login");
    }
    return () => {
      socket.off("displayComments", displayCommentsHandler);
    };
  }, [username, navigation, route.params.id, route.params.title]);

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={(value) => setComment(value)}
          multiline={true}
          placeholder="Write a comment..."
        />
        <Button title="post Comment" onPress={addComment} />
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
