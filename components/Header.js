import React from "react";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

export default function Header() {
  return (
    <Navbar bg="light" expand="sm" className="w-100">
      <Container>
        <Navbar.Brand href="#home">
          <Link href="/">
            <a className="navbar-brand">
              NTU <span className="text-primary">Down</span>detector
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
