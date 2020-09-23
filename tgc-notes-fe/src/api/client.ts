import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql  ", // TODO: this points to test url where you can try some graphQL queries. Replace this with our own API when available
  cache: new InMemoryCache(),
});

export default client;
