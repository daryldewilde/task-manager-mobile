import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen, TaskListScreen, AddTaskScreen } from "../screens";
import { useAuth } from "../../context/AuthContext";

const Stack = createNativeStackNavigator();

function MainStack() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!token ? (
        <Stack.Screen name="Login / Signup" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="Task List" component={TaskListScreen} />
          <Stack.Screen name="Add Task" component={AddTaskScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainStack;