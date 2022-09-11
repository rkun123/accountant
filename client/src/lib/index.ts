import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createSignal } from "react-signal";

const client = new ApolloClient({
  uri: "http://localhost:8080/query",
  cache: new InMemoryCache(),
});

const refetchSignal = createSignal();

export { client, refetchSignal };
