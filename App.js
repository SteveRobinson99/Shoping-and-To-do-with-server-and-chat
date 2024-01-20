import Home from "./screens/Home";
import Comments from "./screens/Comments";
import Login from "./screens/Login";
import ShoppingList from "./screens/ShoppingList"


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./Contexts/UserContext";

const Stack = createNativeStackNavigator();


export default function App() {
    return (
      <UserProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ headerShown: true }}
                />
                <Stack.Screen name='Comments' component={Comments} />
            </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
    );
}