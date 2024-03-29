import {
  View,
  Text,
  Alert,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import React, { useState, useContext } from "react";
import { styles } from "../assets/Styles";
import { UserContext } from "../Contexts/UserContext";

const Login = () => {
  const navigation = useNavigation();
  const { username, setUsername } = useContext(UserContext);

  const handleLogin = () => {
    if (username.trim()) {
      setUsername(username);
      navigation.navigate("To Buy");
    } else {
      Alert.alert("Username is required.");
    }
  };

  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.loginContainer}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          Login
        </Text>
        <View style={{ width: "100%" }}>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <View>
            <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
              SIGN IN
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
