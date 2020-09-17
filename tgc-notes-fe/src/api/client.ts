import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io", // TODO: this points to test url where you can try some graphQL queries. Replace this with our own API when available
  cache: new InMemoryCache(),
});

export default client;
