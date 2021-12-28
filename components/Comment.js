import React from "react";

export default function Comment({ user, text, time }) {
  return (
    <div className="row">
      <p>
        {user} posted at {time}:
      </p>
      <p>{text}</p>
    </div>
  );
}
