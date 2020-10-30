import React from "react";
import { Router } from "@reach/router";

import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  return (
    <>
      <Router>
        <HomePage path="/" />
        <NotFoundPage default />
      </Router>
    </>
  );
};

export default AppRouter;
