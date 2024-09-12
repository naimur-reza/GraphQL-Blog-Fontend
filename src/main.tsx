import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/router";
import { ThemeProvider } from "./components/themeProvider";
import { Toaster } from "./components/ui/sonner";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://holapep-server-production.up.railway.app/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
        <Toaster />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
