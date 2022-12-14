import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createSignal } from "react-signal";

const url: string = import.meta.env.VITE_API_URL;

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

const refetchSignal = createSignal();

export { client, refetchSignal };
