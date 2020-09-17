import { RouteComponentProps } from "@reach/router";
import React, { FC } from "react";
import { navigate } from "@reach/router";
import Page from "../components/Page/Page";

import styles from "./NotFoundPage.module.scss";

const NotFoundPage: FC<RouteComponentProps> = () => {
  const goBack = () => {
    navigate(-1);
  };

  return (
    <Page>
      <div className={styles.wrapper}>
        <p>There is nothing here :(</p>
        <p>
          Perhaps you want to go
          <span className={styles["back-link"]} onClick={goBack}>
            {" "}
            back{" "}
          </span>
          from where you came from ?
        </p>
      </div>
    </Page>
  );
};

export default NotFoundPage;
