import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Notes } from "../types/TNote";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql  ", // TODO: this points to test url where you can try some graphQL queries. Replace this with our own API when available
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          notes: {
            merge(_, incoming: Notes[]) {
              return [...incoming]
            }
          }
        }
      }
    }
  }),
});

export default client;
