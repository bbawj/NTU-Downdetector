import React from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";
import styles from "../styles/Modal.module.css";

export default function Modal({ children }) {
  return (
    <ClientOnlyPortal selector="#modal">
      <div className={styles.overlay}></div>
      <div className={styles.modal}>{children}</div>
    </ClientOnlyPortal>
  );
}
