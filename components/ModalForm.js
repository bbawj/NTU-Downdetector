import React from "react";
import styles from "../styles/ModalForm.module.css";
import BeatLoader from "react-spinners/BeatLoader";

export default function ModalForm({
  children,
  index,
  handleSubmit,
  onSubmit,
  activeTab,
  setOpenModal,
  loading,
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
        {loading ? (
          <BeatLoader loading={loading} />
        ) : (
          <button
            className="btn btn-primary text-white"
            disabled={loading}
            type="submit"
          >
            Submit
          </button>
        )}
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
