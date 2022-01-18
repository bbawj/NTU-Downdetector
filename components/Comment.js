import React from "react";
import { formatTimeAgo } from "../lib/utils";
import styles from "../styles/Comment.module.css";

export default function Comment({ user, text, time }) {
  return (
    <div className="row">
      <p className={styles.header}>
        <span className={styles.username}>{user.split("@")[0]}</span>{" "}
        <span className={styles.duration}>{formatTimeAgo(time)}</span>
      </p>
      <p>{text}</p>
    </div>
  );
}
