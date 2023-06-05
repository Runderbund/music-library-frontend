import React from "react";
import styles from "./Header.module.css";

/**
 * A component that renders the header of the application.
 * @returns {React.JSX.Element}
 */
const Header = () => {
  return (
    <div className={styles.header}>
      <h1>
        <span className={styles.titleMain}>Music</span>
        <span className={styles.titleSub}>"R"</span>
        <span className={styles.titleMain}>Us</span>
      </h1>
    </div>
  );
};

export default Header;
