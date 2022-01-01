import React from "react";
import styles from "../styles/TextInput.module.css";

export default function TextInput({ name, register, errors }) {
  return (
    <label className={styles.inputGroup} htmlFor={name}>
      <input type="text" {...register(name)} required />
      <span className={styles.placeholder}>{name.toUpperCase()}</span>
      <p className="text-danger">{errors.name?.message}</p>
    </label>
  );
}
