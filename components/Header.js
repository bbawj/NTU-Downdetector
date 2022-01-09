import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Navbar bg="light" expand="sm" className="w-100">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <a className="navbar-brand">
              NTU <span className="text-primary">Down</span>detector
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref>
              <Nav.Link active={currentPath === "/"}>Home</Nav.Link>
            </Link>
            <Link href="/about" passHref>
              <Nav.Link active={currentPath === "/about"}>About us</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
