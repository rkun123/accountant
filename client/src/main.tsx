import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client, refetchSignal } from "./lib/index";
import { Auth0Provider } from '@auth0/auth0-react'
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <refetchSignal.Provider>
          <App />
        </refetchSignal.Provider>
      </Auth0Provider>
    </ApolloProvider>
  </React.StrictMode>
);
