import React from "react";
import styles from "../styles/TextInput.module.css";

export default function TextInput({
  name,
  type,
  register,
  errors,
  placeholder,
}) {
  return (
    <label className={styles.inputGroup} htmlFor={name}>
      <input type={type} {...register(name)} required />
      <span className={styles.placeholder}>{placeholder}</span>
      <p className="text-danger">
        {errors[name] ? errors[name].message : null}
      </p>
    </label>
  );
}
