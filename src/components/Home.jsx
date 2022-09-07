import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Form } from "react-bootstrap";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

const Delete = styled.button`
  position: absolute;
  top: 8px;
  right: 5px;
  font-size: 150%;
  background: transparent;
  border: none !important;
`;

const Home = () => {
  const [user, setUser] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteprompt, setDeleteprompt] = useState(false);
  const [workspaceForm, setWorkspaceForm] = useState("");
  const handleShow = () => setShow(true);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setWorkspaceForm("");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setDeleteprompt(false);
    console.log("working");
    db.collection("Workspaces")
      .where("name", "==", workspaceForm)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
        fetchWorkspace();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false);
    const template = {
      columnOrder: [],
      columns: {},
      tasks: {},
      users: [user],
      name: workspaceForm,
    };
    db.collection("Workspaces").doc(workspaceForm).set(template);
    fetchWorkspace();
  };

  const fetchWorkspace = async () => {
    db.collection("Workspaces")
      .where("users", "array-contains", user)
      .get()
      .then((res) => {
        setWorkspaces(res.docs.map((doc) => doc.data()));
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid)
        setUser(user.email);
      } else {
        navigate("/signin");
      }
    });

    fetchWorkspace();
  }, [user]);

  return (
    <div>
      <h4>Welcome Back! {user}</h4>
      <hr/>

      <h4>Your workspaces:</h4>
      <Modal show={deleteprompt} onHide={() => setDeleteprompt(false)}>
        <Modal.Header>
          <Modal.Title>
            Are you sure you want to delete this workspace:
          </Modal.Title>
        </Modal.Header>
        <div align="center">
          <Modal.Body><h4>{workspaceForm}</h4></Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => handleDelete(e)}>
            Confirm
          </Button>
          <Button variant="danger" onClick={() => setDeleteprompt(false)}>
            Maybe Not
          </Button>
        </Modal.Footer>
      </Modal>

      <Row xs={1} md={4} className="g-4">
        {workspaces.length ? (
          workspaces.map((w) => (
            <Col>
              <Card key={w.name} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>
                    <Link to={`/${w.name}`} className="nav-link">
                      {w.name}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    Members:
                    {w.users.map((user) => (
                      <li key={user}>{user}</li>
                    ))}
                  </Card.Text>
                  <Card.Link href={`/workspace/:id`}>Invite Members</Card.Link>
                  <Delete
                    onClick={() => {
                      setDeleteprompt(true);
                      setWorkspaceForm(w.name);
                    }}
                  >
                    🗑️
                  </Delete>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
      <hr/>
      <Button variant="light" onClick={handleShow}>
        Add Workspace
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>What would you like to call your workspace?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={(e) => setWorkspaceForm(e.target.value)}
                type="text"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
