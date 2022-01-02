import React from "react";
import styles from "../styles/ModalForm.module.css";
export default function ModalForm({
  children,
  index,
  handleSubmit,
  onSubmit,
  activeTab,
  setOpenModal,
}) {
  return (
    <form
      className={
        styles.form + " " + (activeTab === index ? styles.activeBody : null)
      }
      onSubmit={handleSubmit(onSubmit)}
    >
      {children}
      <div className={styles.actions}>
        <button className={styles.button + " shadow-sm"} type="submit">
          Login
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}