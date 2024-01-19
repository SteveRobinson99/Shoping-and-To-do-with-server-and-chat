import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Pressable,
} from "react-native";

import React, { useState } from "react";
import { styles } from "../assets/Styles";



const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");

    const handleLogin = () => {
        if (username.trim()) {
            console.log({ username });
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

