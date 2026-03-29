import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { 
  AuthScreen, 
  TaskListScreen, 
  AddTaskScreen,
  TaskDetails
 } from "../screens";
import { useAuth } from "../../context/AuthContext";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

function Navigation() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle:styles.header
        }}
      >
        {!token ? (
          <Stack.Screen name="Login / Signup" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Task List" component={TaskListScreen} />
            <Stack.Screen name="Add Task" component={AddTaskScreen} />
            <Stack.Screen name="Task Details" component={TaskDetails}/>
          </>
        )}
      </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:"#5c8dd6"
  }
})

export default Navigation;