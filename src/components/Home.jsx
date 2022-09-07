import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user.uid)
      setUser(user);
    } else {
      navigate("/signin");
    }
  });

  useEffect(() => {
    let isMounted = true
    const fetchWorkspace = async () => {
      db.collection("Workspaces")
        .where("users", "array-contains", "jonathan")
        .get()
        .then((res) => {
          if (isMounted) {
            setWorkspaces(res.docs.map((doc) => doc.data()));
            console.log(workspaces);
          }
        });
    };
    fetchWorkspace();
    return () =>{isMounted = false}
  }, []);

  return (
    <div>
      <h1>Welcome Back! {user.email}</h1>
      <h2>Your workspaces:</h2>
      <Row xs={2} md={4} className="g-4">
      {workspaces.length? workspaces.map((w) => (
        <Col>
      <Card key={w.name} style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title><Link to={`/${w.name}`} className="nav-link">
                  {w.name}
                </Link></Card.Title>
          <Card.Text>
            Members:
              {w.users.map((user) => <li>{user}</li>)}
          </Card.Text>
          <Card.Link href={`/workspace/:id`}>Invite Members</Card.Link>
        </Card.Body>
      </Card>
      </Col>
      )):<></>}
    </Row>
    </div>
  );
};

export default Home;

