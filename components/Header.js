import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const curPath = router.pathname;

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light w-100">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            NTU <span className="text-primary">Down</span>detector
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/">
                <a
                  className="nav-link"
                  {...(curPath === "/"
                    ? { "aria-current": "page", className: "nav-link active" }
                    : {})}
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a
                  className="nav-link"
                  {...(curPath === "/about"
                    ? { "aria-current": "page", className: "nav-link active" }
                    : {})}
                >
                  About us
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
