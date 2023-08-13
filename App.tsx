import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './src/Main';
import UserContext from './src/context/UserContext';

const queryClient = new QueryClient()
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <Main />
      </UserContext>
    </QueryClientProvider>
  );
}


