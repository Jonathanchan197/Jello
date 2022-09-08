import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Form } from "react-bootstrap";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 25px;
`;

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
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [deleteprompt, setDeleteprompt] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [workspaceForm, setWorkspaceForm] = useState("");
  const [inviteprompt, setInviteprompt] = useState(false);
  const [search, setSearch] = useState("");
  const [sendInvite, setSendInvite] = useState("")
  const handleInviteShow = () => setInviteprompt(true);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleWorkspaceClose = () => {
    setShow(false);
    setWorkspaceForm("");
  };

  const handleInviteClose = () => {
    setInviteprompt(false);
    setSearch("");
  };

  const handleSearch = async (e, email) => {
    e.preventDefault();
    setSearch(email)
    console.log(email)
    const tempData = await db.collection('Users')
    .doc(email)
    .get()
    .then((res) => (res.data()))
    const temp = tempData
    temp.notifications.push({
      user: user,
      workspace: workspaceForm
    })
    db.collection('Users').doc(email).set(temp)
    setSearch("");
    setWorkspaceForm("");
    setInviteprompt(false);
  }

  const searchMembers = (e) => {
    if (e !== "") {
      const filteredSearch = members.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(e.toLowerCase());
      });
      setFilteredMembers(filteredSearch);
    } else {
      setFilteredMembers(members);
    }
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

  const fetchMembers = async () => {
    db.collection("Users")
      .where("email", "!=", user)
      .get()
      .then((res) => {
        setMembers(res.docs.map((doc) => doc.data()));
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

    fetchMembers();
    fetchWorkspace();
  }, [user]);

  return (
    <div>
      <hr />
      <Container>
      <h4>Welcome Back!</h4>
      <h6>{user}</h6>
      </Container>
      <hr />

      <h4>Your workspaces:</h4>
      <Modal show={deleteprompt} onHide={() => setDeleteprompt(false)}>
        <Modal.Header>
          <Modal.Title>
            Are you sure you want to delete this workspace:
          </Modal.Title>
        </Modal.Header>
        <div align="center">
          <Modal.Body>
            <h4>{workspaceForm}</h4>
          </Modal.Body>
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
              <div className="card-block">
              <Card key={w.name} style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>
                    <Link to={`/${w.name}`} className="nav-link">
                      {w.name}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    <h6>Members:</h6>
                    {w.users.map((user) => (
                      <li key={user}>{user}</li>
                    ))}
                  </Card.Text>
                  <Button variant="light" onClick={() => {handleInviteShow() ; setWorkspaceForm(w.name)}}>
                    Invite Members
                  </Button>
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
              </div>
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
      <hr />
      <div className="card-block">

      <Button variant="light" onClick={handleShow}>
        Add Workspace
      </Button>
      </div>
      {/* create workspace */}
      <Modal
        show={show}
        onHide={handleWorkspaceClose}
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
                placeholder="Enter Name"
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
      {/* invite members */}
      <Modal
        show={inviteprompt}
        onHide={handleInviteClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sending invites for "{workspaceForm}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={(e) => searchMembers(e.target.value)}
                type="text"
                placeholder="Search..."
              />
            </Form.Group>
          </Form>
          <Row xs={5} md={2} className="g-1">
            {filteredMembers.length ? (
              filteredMembers.map((m) => (
                <div className="text-center">
                  <Col>
                    <Card key={m.email} style={{ width: "14.5rem"}}>
                      <Button variant="light" onClick={(e) => handleSearch(e, m.email)}> {m.email}</Button>
                    </Card>
                  </Col>
                </div>
              ))
            ) : (
              <></>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
