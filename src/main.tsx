import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import { SidebarProvider, ThemeProvider } from "./context/index.ts";
import "./i18n";
import ErrorBoundary from "./components/error-boundary/index.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: 2000,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <SidebarProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#ffb616",
                },
              }}
            >
              <App />
              <Toaster position="top-right" richColors duration={2000} />
            </ConfigProvider>
          </SidebarProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
