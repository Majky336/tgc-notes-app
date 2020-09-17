import { Link } from "@reach/router";
import React from "react";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link to="/">Notes</Link>
      </div>
    </header>
  );
};

export default Header;
