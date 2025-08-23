import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-thme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
