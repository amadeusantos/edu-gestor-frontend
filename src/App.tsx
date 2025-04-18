import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import '@ant-design/v5-patch-for-react-19';
import { AppRoutes } from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
