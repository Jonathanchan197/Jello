import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Auth";
import { db } from "../firebase";

const Navigation = () => {
  const [isUser, setIsUser] = useState(false);
  const [notifications, setNotifications] = useState("");
  const { user } = UserAuth();
  const navigation = useNavigate();
  const [count, setCount] = useState(0)

  const fetchNotifications = async () => {
    if(count<1) {
   await db.collection("Users")
          .doc(user.email)
          .get()
          .then((res) => setNotifications(res.data()))
          setCount(1)
        }
  }
  
  const handleNavigation = () => {
    navigation(`/profile/${user.email}`)
  }

  const handleHome = () => {
    navigation('/home')
  }

  useEffect(() => {
    const checkUser = () => {
      if (user) {
        setIsUser(true);
      }
    };
    checkUser();
    fetchNotifications();
  }, [user, notifications]);

  return (
    <div className="color-nav">
    <Navbar variant="light" expand="lg">
      
      <Container>
        <Navbar.Brand onClick={handleHome}>
          <h2>Jello</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {isUser ? (
              <>
                <Button className="color-nav" onClick={handleHome} variant="light">Home</Button>
                <Button className="color-nav" onClick={handleNavigation} variant="light">
                  Profile <Badge bg="danger">{notifications ? notifications.notifications.length : <></>}</Badge>
                  <span className="visually-hidden">unread messages</span>
                </Button>
                <Navbar.Toggle />
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
    </div>
  );
};

export default Navigation;
