import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/Auth";

const Navigation = () => {
  const [isUser, setIsUser] = useState(false);
  const { user } = UserAuth();

  const checkUser = () => {
    if (user) {
      setIsUser(true);
    }
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand><h2>📈 Jello</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {isUser ? (
              <>
                <Link to="/home" className="nav-link">
                  Home
                </Link>
                <Navbar.Toggle />
                <Navbar.Text>
                  | Signed in as:{" "}
                  <Link to="/profile">{user && user.email}</Link>
                </Navbar.Text>
              </>
            ) : (
              <>
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
