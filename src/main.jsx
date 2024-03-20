import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import AuthProvider from "./context/authContext";
import SearchProvider from "./context/searchContext.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <SearchProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <App />
              <ToastContainer />
              <ReactQueryDevtools initialIsOpen={false} />
            </Router>
          </QueryClientProvider>
        </SearchProvider>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>
);
