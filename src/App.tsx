import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import "@ant-design/v5-patch-for-react-19";
import { AppRoutes } from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={{locale: "pt_br"}}
        theme={{
          token: {
            colorPrimary: "#FFA92C",
            colorBgContainer: "#F6FAF9",
          },
        }}
      >
        <ReactQueryDevtools initialIsOpen={false} />
        <AppRoutes />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
