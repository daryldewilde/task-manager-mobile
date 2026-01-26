import MainStack from './components/navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import  { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

