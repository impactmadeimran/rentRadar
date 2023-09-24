import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './src/Main';
import UserContext from './src/context/UserContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Main />
        </GestureHandlerRootView>
      </UserContext>
    </QueryClientProvider>
  );
}


