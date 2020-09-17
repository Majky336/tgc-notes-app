import React from "react";
import { Router } from "@reach/router";

import Header from "../components/Header/Header";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  return (
    <>
      <Header />
      <Router>
        <HomePage path="/" />
        <NotFoundPage default />
      </Router>
    </>
  );
};

export default AppRouter;
