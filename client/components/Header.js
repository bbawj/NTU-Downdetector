import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <Link href="/">
        <a className="logo">
          <h3>
            NTU <span>Down</span>detector
          </h3>
        </a>
      </Link>
      <div className="links">
        <Link href="/">Home</Link>
        <Link href="/about">About us</Link>
      </div>
    </nav>
  );
}
