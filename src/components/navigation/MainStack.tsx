import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AuthScreen from "../screens/AuthScreen";

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login / Signup" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;