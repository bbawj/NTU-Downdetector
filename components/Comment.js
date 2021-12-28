import React from "react";
import { formatTimeAgo } from "../lib/utils";

export default function Comment({ user, text, time }) {
  return (
    <div className="row">
      <p>
        {user} posted {formatTimeAgo(time)}
      </p>
      <p>{text}</p>
    </div>
  );
}
