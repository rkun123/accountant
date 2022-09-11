import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client, refetchSignal } from "./lib/index";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <refetchSignal.Provider>
        <App />
      </refetchSignal.Provider>
    </ApolloProvider>
  </React.StrictMode>
);
