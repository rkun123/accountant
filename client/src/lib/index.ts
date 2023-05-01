import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { createSignal } from "react-signal";
import { authLink } from "./auth";

const url: string = import.meta.env.VITE_API_URL;

const httpLink = createHttpLink({
  uri: '/query',
});



const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

const refetchSignal = createSignal();

export { client, refetchSignal };