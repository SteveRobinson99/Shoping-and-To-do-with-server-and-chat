import { NavigationContainer, useNavigation} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./Contexts/UserContext";
import { Button } from "react-native";

import Home from "./screens/Home";
import Comments from "./screens/Comments";
import Login from "./screens/Login";
import ShoppingList from "./screens/ShoppingList"

const Stack = createNativeStackNavigator();

function CustomHeaderRight() {
  const navigation = useNavigation();
  // Could implement logic to check if the user is logged in
  // then if logged in, navigate to ShoppingList, else prompt login
  // standardise formatting on button and put into styles.js (or use same buttonstyle)
  // probably extract custom header component once working as required
  return (
      <Button
          onPress={() => navigation.navigate('ShoppingList')}
          title="Shopping List"
          color="#000"
      />
  );
}

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
                    options={{ headerRight: () => <CustomHeaderRight />}}
                />
                <Stack.Screen name='Comments' component={Comments} />
                <Stack.Screen name='ShoppingList' component={ShoppingList} />
            </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
    );
}