import React from "react";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
