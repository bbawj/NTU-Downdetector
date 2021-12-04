import React from "react";

export default function Card({ name }) {
  return (
    <div className="card btn">
      <img className="card-img-top" src="" alt="" />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
      </div>
    </div>
  );
}
