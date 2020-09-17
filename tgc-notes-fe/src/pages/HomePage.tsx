import React from "react";
import { RouteComponentProps } from "@reach/router";

import Page from "../components/Page/Page";

const HomePage = (props: RouteComponentProps) => {
  return (
    <Page>
      <div>Welcome to homepage</div>
      <div>We should render list of notes here</div>
    </Page>
  );
};

export default HomePage;
