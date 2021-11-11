import React from "react";
import styles from "../styles/Layout.module.css";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
