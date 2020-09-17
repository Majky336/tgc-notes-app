import React, { FC, PropsWithChildren } from "react";

import styles from "./Page.module.scss";

type Props = {};

const Page: FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Page;
