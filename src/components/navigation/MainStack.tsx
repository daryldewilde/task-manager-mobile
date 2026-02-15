import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen, TaskListScreen, AddTaskScreen } from "../screens";
import { getData } from "../../utils/utils";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

function MainStack() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getData('token');
      setToken(storedToken);
      setIsLoading(false);
    };
    checkToken();
  }, []);

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