import React from "react";
import { ApolloProvider } from "@apollo/client";

import AppRouter from "./router/AppRouter";
import client from "./api/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
