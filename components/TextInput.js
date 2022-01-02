import React from "react";
import styles from "../styles/TextInput.module.css";

export default function TextInput({ name, register, errors, placeholder }) {
  return (
    <label className={styles.inputGroup} htmlFor={name}>
      <input
        type={name === "password" ? "password" : "text"}
        {...register(name)}
        required
      />
      <span className={styles.placeholder}>{placeholder}</span>
      <p className="text-danger">{errors.name?.message}</p>
    </label>
  );
}